import React, { useState, useEffect, useContext, useRef } from "react";
import { chatContext } from "../../store/ChatContext";
import { authContext } from "../../store/AuthContext";
import classes from "./MessageForm.module.css";
import { Link } from "react-router-dom";
import home from "../../assets/icons8-home.svg";
const MessageForm = () => {
  const [message, setMessage] = useState("");
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
  const authCtx = useContext(authContext);
  const user = authCtx.user;
  // const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
  //   useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();
  useEffect(() => {
    socket.off("room-messages").on("room-messages", (roomMessages) => {
      console.log("room messages request");
      messagesHandler(roomMessages);
    });
  }, [socket]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    const lastMsg = lastMessage;
    console.log(lastMsg);
    socket.emit(
      "message-room",
      roomId,
      message,
      user,
      time,
      todayDate,
      roomType
    );
    setMessage("");
  }

  return (
    <>
      <div className={classes["messageContainer"]}>
        <div className="px-2">
          {user && !privateMemberMsg?._id && (
            <div className="flex w-full rounded-b-xl bg-primaryColorDull px-8 py-3 justify-between items-center">
              <p className=" text-3xl text-slate-50">
                You are in the {currentRoom} room
              </p>
              <div>
                <Link to="/" className="text-secondaryColor text-3xl">
                  <img className="w-16 text-secondaryColor" src={home}></img>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="px-2">
          {user && privateMemberMsg?._id && (
            <div className="flex w-full rounded-b-xl justify-between bg-primaryColorDull px-8 py-3 items-center ">
              <div className=" text-slate-50 text-5xl ">
                <div className="flex">
                  Your conversation with {privateMemberMsg.name}{" "}
                  {/* <img
               src={privateMemberMsg.picture}
               className="rounder-[100%] border-2px border-white"
               alt=""
              /> */}
                </div>
              </div>
              <div>
                <Link to="/" className="text-secondaryColor text-3xl">
                  <img className="w-16 text-secondaryColor" src={home}></img>
                </Link>
              </div>
            </div>
          )}
          {!user && (
            <div className=" bg-[#e63b3bcd] text-secondaryColor py-3 px-4 text-3xl rounded-lg">
              Please login
            </div>
          )}
        </div>
        <div className={classes[`messages-output`]}>
          {user &&
            messages.map(({ _id: date, messagesByDate }, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-center mt-4">
                  <p className="bg-[#cff4fc] px-4 py-3 text-2xl rounded-lg">
                    {date}
                  </p>
                </div>
                {messagesByDate?.map(
                  ({ content, time, from: sender }, msgIdx) => (
                    <div
                      className={
                        sender?.email === user?.email
                          ? classes[`message`]
                          : classes["incoming-message"]
                      }
                      key={msgIdx}
                    >
                      <div className={classes[`message-inner`]}>
                        <div className=" align-items-center mb-3">
                          {/*<img
                      src={sender.picture}
                      style={{
                        width: 35,
                        height: 35,
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                      alt=""
                    /> */}
                          {/*<p className="message-sender">
                      {sender._id === user?._id ? "You" : sender.name}
                </p> */}
                        </div>
                        <div className="flex justify-between gap-8">
                          <p className="text-2xl mb-6">{content}</p>
                          <span
                            className={`text-right px-4  text-2xl rounded h-fit text-[#333] self-end ${
                              sender?.email === user?.email
                                ? "text-slate-50"
                                : "text-slate-50"
                            } `}
                          >
                            {time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          <div ref={messageEndRef} />
        </div>
        <div className="px-2 ">
          <div className="flex w-full px-12 items-center justify-center  py-6  bg-primaryColor rounded-t-2xl">
            <form onSubmit={handleSubmit} className={classes["messageSender"]}>
              <div className="flex gap-3">
                <div className="flex flex-col flex-1">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Your message"
                      disabled={!user}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="py-6 px-4 rounded-xl w-full border-3 border-primaryColor text-2xl text-primaryColor focus:outline-none"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className=" bg-secondaryColor text-primaryColor px-8 py-4 flex items-center justify-center text-4xl rounded-xl"
                    disabled={!user}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-12"
                      viewBox="0 0 24 24"
                    >
                      <title>send</title>
                      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageForm;
