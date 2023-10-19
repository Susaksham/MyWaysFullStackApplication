import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();

import User from "./models/User.js";
import Message from "./models/Message.js";
const rooms = ["General", "Tech", "Finance", "Crypto"];
import cors from "cors";
import morgan from "morgan";
import conn from "./connection.js";
import Conversation from "./models/Conversation.js";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/users", userRoutes);
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
/** to get messages from that room */
async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  // $$ROOT is a system variable to access the current document

  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

async function findLastMessageBetweenUsers(user1Id) {
  try {
    // Find the conversation involving both users
    const conversation = await Conversation.find({
      participants: { $all: [user1Id] },
    }).populate("lastMessage");

    if (!conversation) {
      // No conversation found between these two users
      return null;
    }
    return conversation;
  } catch (error) {
    console.error("Error finding last message:", error);
    return 0;
  }
}
async function addLastMessageBetweenUsers(user1Id, user2Id, newMessage) {
  try {
    // Find the conversation involving both users
    console.log(
      "------------------------------------------------------------------"
    );

    const conversation = await Conversation.findOne({
      $or: [
        { participants: { $all: [user1Id, user2Id] } },
        { participants: { $all: [user2Id, user1Id] } },
      ],
    });
    if (!conversation) {
      // create new Conversation
      const newConversation = new Conversation({
        participants: [user1Id, user2Id],
        lastMessage: newMessage._id,
      });
      await newConversation.save();
    } else {
      conversation.lastMessage = newMessage._id;
      await conversation.save();
    }

    // Return the last message
  } catch (error) {
    console.error("Error finding last message:", error);
    throw error;
  }
}
// socket connection

io.on("connection", (socket) => {
  // whenever a new user login return all the members
  socket.on("new-user", async (userId) => {
    const members = await User.find();

    const conversation = await findLastMessageBetweenUsers(userId);

    io.emit("new-user", members);
    socket.emit("last-message", conversation);
  });
  // when the user joins new room
  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on(
    "message-room",
    async (room, content, sender, time, date, roomType) => {
      const newMessage = await Message.create({
        content,
        from: sender,
        time,
        date,
        to: room,
      });
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);

      // if room type is personal
      if (roomType === 1) {
        const user1 = room.split("-")[0];
        const user2 = room.split("-")[1];

        await addLastMessageBetweenUsers(user1, user2, newMessage);
        // sending message to room
        const conversation = await findLastMessageBetweenUsers(sender);
        console.log("user 1 ", "and user 2 last conversation ", conversation);
        socket.emit("updatelast-message", { conversation, user1, user2 });
        socket.broadcast.emit("updatelast-message", {
          conversation,
          user1,
          user2,
        });

        io.to(room).emit("room-messages", roomMessages);
        // socket.broadcast.emit("notifications", room);
      } else if (roomType == 0) {
        // when room type is normal chat
        io.to(room).emit("room-messages", roomMessages);
        // socket.broadcast.emit("notifications", room);
      }
    }
  );

  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});
conn()
  .then(() => {
    server.listen(PORT, () => {
      console.log("listening to port", PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
