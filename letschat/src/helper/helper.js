/* End point : http://localhost:5001/users*/
export const signUpHandler = async (name, email, password, picture) => {
  //   if (!picture) {
  //     picture = "asdfasdf";
  //   }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_END_POINT}/users`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password, picture }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    const user = await response.json();

    return { data: user, code: 1 };
  } catch (err) {
    console.log(err.message);
    return { message: err.message, code: 0 };
  }
};
/* End point : http://localhost:5001/users*/
export const loginHandler = async (email, password) => {
  console.log(email, password);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_END_POINT}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to login the  user");
    }
    const user = await response.json();
    return { data: user, message: "Successfully login", code: 1 };
  } catch (err) {
    console.log(err.message);
    return { message: err.message, code: 0 };
  }
};

export const saveUserInfo = (user) => {
  localStorage.setItem("letschat", JSON.stringify(user));
};

export const loginUsingTokenHandler = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_END_POINT}/users/loginwithtoken`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("response is not ok");
      throw new Error("Failed to login the user");
    }
    const user = await response.json();

    return user;
  } catch (err) {
    throw new Error(`${err.message}`);
  }
};
