import React from "react";
import { NavLink } from "react-router-dom";
const links = [
  { title: "Home", link: "" },
  { title: "About Us", link: "about" },
  { title: "Pricing", link: "price" },
];
const NavLinks = () => {
  return (
    <div className="flex gap-4 text-6xl font-Oswald">
      {links.map((linkInfo, index) => {
        return (
          <NavLink
            key={index}
            to={`/${linkInfo.link}`}
            className="text-slate-50 no-underline"
          >
            {linkInfo.title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
