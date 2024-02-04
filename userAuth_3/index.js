import express from "express";
import ConnectToDb from "./config/dbConnection.js";
import mongoose from "mongoose";
import dotEnv from "dotenv";
import Router from "./routes/router.js";
const App = express();
dotEnv.config();
ConnectToDb();

const PORT = process.env.PORT || 5000;

App.use(express.urlencoded({ extended: false }));
App.use(express.json());
App.use("/api", Router);

mongoose.connection.once("open", () => {
  console.log("Mongoose connected");
  App.listen(PORT, () =>
    console.log(`server listening on http://localhost:${PORT}/`)
  );
});
