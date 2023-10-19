import React, { Children, createContext, useEffect, useState } from "react";
import {
  loginHandler,
  signUpHandler,
  saveUserInfo,
  loginUsingTokenHandler,
} from "../helper/helper";
import toast, { Toaster } from "react-hot-toast";

export const authContext = createContext({
  user: { _id: "", name: "", email: "", status: "" },
  newMessages: {},
  loginUser: () => {},
  signUpUser: () => {},
  logoutUser: () => {},
});

const AuthContext = ({ children }) => {
  /* user info */
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    status: "",
  });
  const [newMessages, setNewMessages] = useState({});

  /* login user */
  const loginUser = async (email, password) => {
    const loginId = toast.loading("checking user", {
      style: {
        fontSize: "3rem",
      },
    });
    try {
      const userInfo = await loginHandler(email, password);

      console.log(userInfo);
      if (userInfo.code == 0) {
        throw new Error(userInfo.message);
      }
      toast.success("Login Successfull!!", {
        id: loginId,
      });
      saveUserInfo(userInfo.data);
      setUser({
        _id: userInfo.data._id,
        name: userInfo.data.name,
        email: userInfo.data.email,
        status: userInfo.data.status,
      });
      setNewMessages(userInfo.newMessages);
      console.log(userInfo);
      return userInfo;
    } catch (err) {
      console.log(err.message);
      toast.error(`${err.message}!!`, { id: loginId });
      throw new Error(err.message);
    }
  };
  /**------------------------------------------------------------------------ */
  /* signup user */
  const signUpUser = async (name, email, password, picture) => {
    const signupId = toast.loading("Signingup the user!!", {
      style: {
        fontSize: "3rem",
      },
    });
    try {
      const userInfo = await signUpHandler(name, email, password, picture);
      if (userInfo.code === 0) {
        throw new Error(userInfo.message);
      }
      toast.success("SignUp Successfull!!", {
        id: signupId,
      });
      console.log(userInfo);
      saveUserInfo(userInfo.data);
      setUser({
        _id: userInfo.data._id,
        name: userInfo.data.name,
        email: userInfo.data.email,
        status: userInfo.data.status,
      });
      setNewMessages(userInfo.newMessages);
      console.log(userInfo);
    } catch (err) {
      console.log(err.message);
      toast.error(`${err.message}!!`, {
        id: signupId,
      });
      throw new Error(`${err.message}`);
    }
  };
  /* ----------------------------------------------------------------------------------------------------- */
  /* logout user */
  const logoutUser = () => {
    setUser({
      _id: "",
      name: "",
      email: "",
      status: "",
    });
    setNewMessages({});
    localStorage.removeItem("letschat");
  };
  const obj = {
    user,
    newMessages,
    loginUser,
    signUpUser,
    logoutUser,
  };
  useEffect(() => {
    const checkUser = async (token) => {
      try {
        const userInfo = await loginUsingTokenHandler(token);
        setUser({
          _id: userInfo._id,
          name: userInfo.name,
          email: userInfo.email,
          status: userInfo.status,
        });
        setNewMessages(userInfo.newMessages);
      } catch (err) {
        console.log(err.message);
        localStorage.removeItem("letschat");
      }
    };
    const storage = JSON.parse(localStorage.getItem("letschat"));
    if (storage?.token) {
      checkUser(storage?.token);
    } else {
    }
  }, []);
  return (
    <authContext.Provider value={obj}>
      <Toaster></Toaster>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
