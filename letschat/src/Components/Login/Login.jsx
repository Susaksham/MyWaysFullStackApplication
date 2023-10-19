import React, { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import arrow from "../../assets/icons8-arrow-96.png";
import classes from "./Login.module.css";
import chattingImage from "../../assets/Sign in-amico.png";
import { authContext } from "../../store/AuthContext";
import { socket } from "../../store/ChatContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(authContext);
  // const { socket } = useContext(AppContext);
  // const [loginUser, { isLoading, error }] = useLoginUserMutation();
  function handleLogin(e) {
    e.preventDefault();
    // login logic
    // loginUser({ email, password }).then(({ data }) => {
    //   if (data) {
    //     // socket work
    //     socket.emit("new-user");
    //     // navigate to the chat
    //     navigate("/chat");
    //   }
    // });
    console.log(email, password);
    authCtx
      .loginUser(email, password)
      .then((data) => {
        //socket work
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //bg-[#292929]
  return (
    <div className="w-full h-screen  flex flex-col ">
      <div
        className="text-3xl rounded-full px-2 py-2 rotate-180 bg-white absolute z-10 top-10 left-16 shadow-backButton"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="w-10 h-10    " src={arrow} alt=""></img>
      </div>
      <div className="w-full flex items-center justify-center h-full    ">
        <div className={classes.loginContainer}>
          <div className="flex-1 flex items-center justify-center h-full bg-primaryColor  ">
            <img
              src={chattingImage}
              className={classes.loginImage}
              alt=""
            ></img>
          </div>
          <div className="flex flex-col flex-1 gap-4 ">
            <h1 className="text-center text-primaryColor text-6xl font-Oswald tracking-wider">
              Login In Now
            </h1>
            <p className="text-zinc-600 text-3xl text-center">
              Please login to continue using our app
            </p>
            <form
              className="flex  items-center justify-center gap-16 mt-8"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col ">
                {/*error && (
                  <p className=" bg-red-700 text-3xl text-slate-50 rounded-lg py-2 px-4">
                    {error.data}
                  </p>
                )*/}

                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  className={classes.email}
                />
                <p className="text-lime-600 text-2xl mt-6">
                  We'll never share your email with anyone else.
                </p>

                <input
                  className={classes.password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required={true}
                />

                <button
                  type="submit"
                  className="no-underline  text-secondaryColor border-red-50  bg-primaryColor px-10 py-2 rounded-md  mx-auto font-Oswald text-bold text-4xl w-fit items-center mt-8"
                >
                  {/*isLoading ? <Spinner animation="grow" /> : "Login" */}
                  Login
                </button>
                <div className="py-8">
                  <p className="text-center text-3xl text-slate-600 font-Oswald tracking-wider">
                    Don't have an account ?{" "}
                    <Link
                      to="/signup"
                      className="no-underline text-3xl text-primaryColor font-Oswald"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
