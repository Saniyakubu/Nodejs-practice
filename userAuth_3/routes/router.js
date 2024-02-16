import express from "express";
import { RegisterUser, getUsers, logUser } from "../controller/userAuth.js";
import isTokenValid from "../auth/verifyToken.js";
import { SentMessage } from "../controller/messages.js";
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("welcome back to our server");
})
  .get("/users", isTokenValid, getUsers)
  .post("/register", RegisterUser)
  .post("/login", logUser)
  .post("/message/send/:receiverId", isTokenValid, SentMessage);
// .get("/message/get/:receiverId", isTokenValid, getMessage)

export default Router;
