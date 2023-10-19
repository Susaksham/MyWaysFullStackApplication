import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const signUpHandler = async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    // creating token for the user
    var token = jwt.sign(
      { name: name, email: email },
      `${process.env.JWT_SECRET}`
    );
    console.log(token);
    const user = await User.create({ name, email, password, token, picture });
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if (e.code == 11000) {
      msg = "User already exists";
    } else {
      msg = e.message;
    }
    console.log(e);
    res.status(400).json(msg);
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const tokenHandler = async (req, res) => {
  // Get the token from the request body
  const token = req.body.token;
  console.log(token);

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // The token is invalid
      res.status(401).send("Unauthorized");
    } else {
      // The token is valid
      console.log(decoded);

      User.findByToken(decoded.name, decoded.email)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(404).json("User not found");
        });
    }
  });
};
export const getUserTodo = async (req, res) => {
  const groupId = req.body.id;
};
