import React, { useState, useContext, useEffect } from "react";
import classes from "./Sidebar.module.css";
import groupImage from "../../assets/icons8-group-64.png";
import chatsImages from "../../assets/icons8-chat-100.png";
import dummyImage from "../../assets/cars.jpg";
import { chatContext } from "../../store/ChatContext";
import { authContext } from "../../store/AuthContext";

const Sidebar = () => {
  const authCtx = useContext(authContext);
  const [showChats, setShowChats] = useState(true);

  const user = authCtx.user;

  const {
    roomType,
    roomTypeHandler,
    rooms,
    currentRoom,
    members,
    messages,
    privateMemberMsg,
    newMessages,
    socket,
    roomsHandler,
    currentRoomHandler,
    membersHandler,
    messagesHandler,
    privateMemberMsgHandler,
    newMessagesHandler,
    lastMessage,
    setLastMessageHandler,
    currentMember,
    setCurrentMemberHandler,
  } = useContext(chatContext);

  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    console.log("join room ", room, "leaving ", currentRoom);
    socket.emit("join-room", room, currentRoom);
    currentRoomHandler(room);

    if (isPublic) {
      privateMemberMsgHandler(null);
    }
    // dispatch for notifications
    // dispatch(resetNotifications(room));
  }

  // socket.off("notifications").on("notifications", (room) => {
  //   // if (currentRoom != room) dispatch(addNotifications(room));
  // });

  useEffect(() => {
    /**when ever page loads set the general as the first group */
    if (user._id) {
      currentRoomHandler("general");
      getRooms();
      socket.emit("join-room", "general");
      roomTypeHandler(0);
      socket.emit("new-user", authCtx.user._id);
    }
  }, [authCtx.user]);

  useEffect(() => {
    /* whenever new user joins */
    socket.on("new-user", (payload) => {
      console.log("new user joined");

      membersHandler(payload);
    });
    /* last message  */
    socket.on("last-message", (data) => {
      console.log("current user id : ", authCtx.user._id);
      console.log("last message");
      console.log(data);
      const obj = {};
      // constructing last message
      constructLastMessage(obj, data);
      setLastMessageHandler(obj);
      console.log("last messages ", obj);
    });
    // changing the last message
    socket.on("updatelast-message", ({ conversation, user1, user2 }) => {
      console.log("updatelast message hit");
      console.log("currentuser" + authCtx.user._id);
      if (user1 === authCtx.user._id || user2 === authCtx.user._id) {
        const obj = {};
        // constructing last message
        constructLastMessage(obj, conversation);
        console.log(obj);
        setLastMessageHandler(obj);
      } else {
        console.log("when the user does not match ");
      }
    });
  }, [socket, authCtx.user]);

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => roomsHandler(data));
  }
  function constructLastMessage(obj, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].participants.length == 2) {
        if (
          authCtx.user_id === data[i].participants[0] &&
          authCtx.user._id === data[i].participants[1]
        ) {
          obj[`${data[i].participants[0]}`] = data[i].lastMessage;
        }
        if (authCtx.user._id != data[i].participants[0]) {
          obj[`${data[i].participants[0]}`] = data[i].lastMessage;
        } else {
          obj[`${data[i].participants[1]}`] = data[i].lastMessage;
        }
      }
    }
  }
  // what ever is having a greater id will join the room
  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    privateMemberMsgHandler(member);

    setCurrentMemberHandler(member._id);
    const roomId = orderIds(user._id, member._id);

    joinRoom(roomId, false);
  }

  if (!user) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4  relative ">
      <div className={classes.chatNav}>
        <div
          onClick={() => setShowChats(true)}
          className="text-secondaryColor flex items-center justify-center text-5xl font-Oswald tracking-wider font-bold  cursor-pointer"
        >
          <img className="w-16" src={chatsImages} alt=""></img>
        </div>
        <div
          onClick={() => setShowChats(false)}
          className="text-secondaryColor text-2xl font-Oswald tracking-wider font-bold cursor-pointer"
        >
          <img className="w-16" src={groupImage} alt=""></img>
        </div>
      </div>
      {/* showing available room */}

      <form className="flex items-center justify-center text-secondaryColor">
        <input
          class={classes.search}
          type="text"
          placeholder="Search or Start a Chat"
        ></input>
      </form>
      {showChats && (
        <ul className="list-none flex gap-8 flex-col mt-4 pl-0">
          {members.map((member) => (
            <li
              key={`${member._id}${Math.random()}`}
              style={{ cursor: "pointer" }}
              active={privateMemberMsg?._id === member?._id}
              onClick={() => {
                handlePrivateMemberMsg(member);
                roomTypeHandler(1);
              }}
              disabled={member._id === user._id}
              className="list-none py-4 px-4 hover:bg-[#B184F4] hover:text-secondaryColor text-secondaryColor"
            >
              <div className="flex relative gap-8">
                <div className="flex flex-col gap-4 relative items-center justify-center">
                  <img
                    src={dummyImage}
                    className={classes[`member-status-img`]}
                    alt=""
                  />
                  {member.status === "online" ? (
                    <i
                      className={`fas fa-circle ${
                        classes[`sidebar-online-status`]
                      }  absolute bottom-0 left-0   w-fit`}
                    ></i>
                  ) : (
                    <i
                      className={`fas fa-circle ${
                        classes[`sidebar-offline-status`]
                      } absolute bottom-0 right-0 left-0 w-fit`}
                    ></i>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <div className=" text-inherit text-3xl w-full font-Oswald relative before:w-4/5 before:h-1 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-primaryColor  py-4">
                    {member.name}
                    {member._id === user?._id && " (You)"}
                    {member.status === "offline" && " (Offline)"}
                  </div>
                  <p className="text-xl">
                    {lastMessage[`${member._id}`]
                      ? lastMessage[`${member._id}`].content
                      : ""}
                  </p>
                </div>
                <div className="text-inherit">
                  {/* <span className="badge rounded-pill bg-primary">
                    {user.newMessages[orderIds(member._id, user._id)]}
                  </span> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!showChats && (
        <ul className="flex flex-col gap-2 justify-center items-start mt-4 pl-0">
          {rooms.map((room, idx) => (
            <li
              key={idx}
              onClick={() => {
                joinRoom(room);
                roomTypeHandler(0);
              }}
              active={room == currentRoom}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
              className={`w-full  rounded-lg text-3xl font-Oswald  py-2 px-2 list-none  text-secondaryColor `}
            >
              {room}{" "}
              {/* {currentRoom !== room && (
                <span className="badge rounded-pill ">{newMessages[room]}</span>
              )} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
