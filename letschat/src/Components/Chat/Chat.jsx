import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { chatContext } from "../../store/ChatContext";
import MessageForm from "../MessageForm/MessageForm";
const Chat = () => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <div className="shadow-[#26262633] shadow-xl">
        {/* <Navigation></Navigation> */}
      </div>
      <div className="  w-full h-full overflow-hidden flex p-4   bg-[#1A023E]">
        <div className="flex  w-screen items">
          <div className=" w-1/4  shadow-sideBar border-primaryColor bg-primaryColor  ">
            <Sidebar />
          </div>
          <div className="  w-3/4 shadow-message">{<MessageForm />}</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
