import React, { createContext, useState } from "react";
import { io } from "socket.io-client";
export const socket = io(`${import.meta.env.VITE_API_END_POINT}`);
export const chatContext = createContext({
  rooms: [],
  currentRoom: [],
  members: [],
  messages: [],
  privateMemberMsg: {},
  newMessages: [],
  roomsHandler: () => {},
  currentRoomHandler: () => {},
  membersHandler: () => {},
  messagesHandler: () => {},
  privateMemberMsgHandler: () => {},
  newMessagesHandler: () => {},
});

const ChatContext = ({ children }) => {
  /* 0 -- > open chat , 1 -- > personal chat */
  const [roomType, setRoomType] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const [currentMember, setCurrentMember] = useState("");
  const roomTypeHandler = (type) => {
    setRoomType(type);
  };
  const roomsHandler = (room) => {
    setRooms(room);
  };
  const currentRoomHandler = (currRoom) => {
    setCurrentRoom(currRoom);
  };
  const membersHandler = (allMembers) => {
    setMembers(allMembers);
  };
  const messagesHandler = (allMessages) => {
    setMessages(allMessages);
  };

  const privateMemberMsgHandler = (privateMemberMessage) => {
    setPrivateMemberMsg(privateMemberMessage);
  };
  const newMessagesHandler = (newMesg) => {
    setNewMessages(newMesg);
  };
  const setLastMessageHandler = (msg) => {
    setLastMessage(msg);
  };
  const setCurrentMemberHandler = (id) => {
    setCurrentMember(id);
  };
  const chatObj = {
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
  };
  return (
    <chatContext.Provider value={chatObj}>{children}</chatContext.Provider>
  );
};

export default ChatContext;
