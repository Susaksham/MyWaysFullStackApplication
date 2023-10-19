import express from "express";
const router = express.Router();
import {
  signUpHandler,
  loginHandler,
  tokenHandler,
} from "../controllers/userController.js";

// creating user
router.post("/", signUpHandler);

// login user

router.post("/login", loginHandler);
// url : - http://localhost:5001/users/loginwithtoken
router.post("/loginwithtoken", tokenHandler);

export default router;
