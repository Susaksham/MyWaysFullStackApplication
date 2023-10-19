import mongoose from "mongoose";

const globalChatSchema = mongoose.Schema({
  globalChatName: {
    type: String,
    required: true,
  },

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
});

const GlobalModal = mongoose.model("GlobalChat", globalChatSchema);
