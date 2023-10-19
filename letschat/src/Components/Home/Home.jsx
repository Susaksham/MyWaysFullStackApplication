import React from "react";
import Navigation from "../Navigation/Navigation";
import HeroSection from "../HeroSection/HeroSection";
import Features from "../Features/Features";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.home}>
      {/* wrapper */}
      {/** hero section */}
      <div className="w-full min-h-screen max-h-screen bg-black flex flex-col">
        <Navigation />
        <HeroSection></HeroSection>
      </div>
      <Features></Features>
    </div>
  );
};

export default Home;
