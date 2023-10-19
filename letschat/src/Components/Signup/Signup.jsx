import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import arrow from "../../assets/icons8-arrow-96.png";
import chattingImage from "../../assets/Sign in-amico.png";
import cars from "../../assets/cars.jpg";
import classes from "./Signup.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { authContext } from "../../store/AuthContext";
import { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

const Signup = () => {
  const authCtx = useContext(authContext);
  console.log(authCtx);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  //image upload states
  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  //validating the image
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }
  // uploading the image
  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "your-preset-here");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/your-username-here/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!image) return alert("Please upload your profile picture");
      const url = await uploadImage(image);
      console.log(url);
      console.log(name, email, password, url);
      const signingUser = await authCtx.signUpUser(name, email, password, url);
      console.log(signingUser);
      navigate("/chat");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <Toaster />
      <div
        className="text-3xl rounded-full px-2 py-2 rotate-180 bg-white absolute z-10 top-10 left-16 shadow-backButton"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img className="w-10 h-10" src={arrow} alt=""></img>
      </div>
      <div className="flex-1 flex items-center justify-center h-full bg-primaryColor  ">
        <img src={chattingImage} className={classes.loginImage} alt=""></img>
      </div>
      <div
        className=" w-full flex-1 flex items-center justify-center
"
      >
        <div className="flex   items-center  justify-between  px-24 rounded-lg py-2 ">
          <div className="flex-1 ">
            <form
              className="flex flex-col items-center gap-8 "
              onSubmit={handleSignup}
            >
              <h1 className="text-center text-6xl  text-primaryColor">
                {" "}
                Create Account
              </h1>
              <div className="w-fit relative rounded-[200%] border-2">
                <div className="relative rounded-full">
                  <img
                    src={imagePreview || cars}
                    className={classes[`signup-profile-pic`]}
                    alt=""
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 text-5xl right-3 w-fit rounded  z-50 "
                  >
                    <AiFillPlusCircle></AiFillPlusCircle>
                  </label>
                </div>

                <input
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={validateImg}
                />
              </div>
              {/*error && (
                <p className=" bg-red-700  rounded-lg py-2 px-4">
                  {error.data}
                </p>
              )*/}
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={classes.name}
                ></input>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={classes.email}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={classes.password}
                />
              </div>
              <button
                type="submit"
                className=" py-2 px-8 border-2 border-primaryColor text-3xl bg-primaryColor text-slate-50 rounded "
              >
                {/*upladingImg || isLoading ? "Signing you up..." : "Signup"*/}
                Signup
              </button>

              <div className="py-4">
                <p className="text-center text-3xl font-Oswald tracking-wider">
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    className="no-underline text-3xl text-primaryColor font-Oswald"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
