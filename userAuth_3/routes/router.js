import express from "express";
import { RegisterUser } from "../controller/userAuth.js";
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("welcome back to our server");
}).post("/register", RegisterUser);

export default Router;
