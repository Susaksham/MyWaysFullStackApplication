import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conn = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("mongodb connected successfully");
    return connection;
  } catch (err) {
    console.log(err.message);
  }
};
export default conn;
