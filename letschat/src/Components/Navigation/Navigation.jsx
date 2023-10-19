import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { authContext } from "../../store/AuthContext";
const Navigation = () => {
  const authCtx = useContext(authContext);
  const user = authCtx.user.name;
  const handleLogout = () => {
    authCtx.logoutUser();
  };
  console.log(user);
  return (
    <div className="relative z-50  w-full  h-fit bg-primaryColor ">
      {/* color available  bg-[#1f1e1e] */}
      <div className="flex px-32 py-4 items-center w-full justify-between ">
        <div>
          <Link
            to="/"
            className="no-underline text-5xl font-Oswald text-slate-50"
          >
            LetsChat
          </Link>
        </div>

        <div>
          <NavLinks></NavLinks>
        </div>
        <div className="flex items-center gap-4">
          {!user && (
            <Link
              to="/login"
              className=" no-underline border-2 border-red-50 px-10 py-3 rounded text-5xl flex items-center justify-center text-slate-50"
            >
              <span>Login</span>
            </Link>
          )}
          <Link
            to="/chat"
            className=" no-underline border-2 border-red-50 px-10 py-3 rounded text-5xl flex items-center justify-center text-slate-100"
          >
            <span>Chat</span>
          </Link>
          {user && (
            <div className="flex items-center gap-2">
              <img src={user.picture} alt=" "></img>
              <span className="text-slate-50 text-3xl">
                {user.name || "Susaksham"}
              </span>
            </div>
          )}

          {user && (
            <button
              className="rounded text-slate-50 bg-[#dc3545] px-6 py-3 text-3xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
