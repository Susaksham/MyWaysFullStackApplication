import React from "react";
import { Link } from "react-router-dom";
import privacy from "../../assets/icons8-privacy-100.png";
import group from "../../assets/icons8-group-chat-96.png";
import attachments from "../../assets/icons8-attach-100.png";
const features = [
  { text: "PRIVACY", imgLink: privacy },
  { text: "GROUP CHAT", imgLink: group },
  { text: "ATTACHMENTS", imgLink: attachments },
];
const Features = () => {
  return (
    <div className="w-full min-h-screen max-h-screen py-36 px-36 flex flex-col gap-36  relative">
      <span className="absolute w-6 h-6 bg-primaryColor rounded-full right-44"></span>
      <span className="absolute w-6 h-6 bg-primaryColor rounded-full left-44 bottom-44"></span>
      <h1 className="text-primaryColor text-6xl font-Oswald tracking-wide text-center font-bold">
        WHY CHOOSE LETSCHAT
      </h1>
      {/*features */}
      <div className="flex gap-36 px-12 w-full justify-center">
        {features.map((feature, index) => {
          return (
            <div className="flex flex-col items-center gap-16" key={index}>
              <img className="w-[6.4rem]" src={feature.imgLink} alt=""></img>
              <div className="flex flex-col items-center gap-10 ">
                <h3 className="text-slate-700 font-Oswald text-5xl font-bold tracking-wider">
                  {feature.text}
                </h3>
                <p className="text-center text-4xl font-Oswald font-thin tracking-wider text-slate-500">
                  Lorem only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to="/signup"
          className=" no-underline   border-red-50 text-secondaryColor flex items-center justify-center   bg-primaryColor px-20 py-4 rounded-tr-xl  font-Oswald text-bold text-7xl w-fit "
        >
          <span>SIGN UP TODAY</span>
        </Link>
      </div>
    </div>
  );
};

export default Features;
