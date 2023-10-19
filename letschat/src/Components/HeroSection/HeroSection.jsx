import React from "react";
import classes from "./HeroSection.module.css";
import { Link } from "react-router-dom";
import mainImage from "../../assets/Messages-pana.png";
const HeroSection = () => {
  return (
    <div className="w-full h-full bg-primaryColor px-32 flex flex-col">
      {/* banner */}

      {/* container */}

      <div className="flex-1 h-full flex items-center  relative bottom-16">
        <div className="flex justify-between w-full items-center">
          {/* left  */}
          <div className="flex relative h-fit flex-col gap-12 before:w-24 before:h-[0.35rem] before:bg-secondaryColor before:absolute before:-top-8  after:w-24 after:h-[0.35rem] after:bg-secondaryColor after:absolute after:-bottom-4 after:right-0">
            <div>
              <h1 className={classes.heading}>PEOPLE WHO LIKE</h1>
              <h1 className={classes.heading}>TO TALK MORE</h1>
            </div>

            <p className="text-secondaryColor font-Oswald text-5xl">
              Welcome your new chatting app, LetsChat
            </p>
            <Link
              to="/signup"
              className=" no-underline  bg-secondaryColor border-red-50 flex items-center justify-center  text-primaryColor px-10 py-3 rounded-tr-xl  font-Oswald text-bold text-6xl w-fit"
            >
              <span>Sign Up</span>
            </Link>
          </div>
          {/** right */}
          <div>
            <img className={classes.mainImage} src={mainImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
