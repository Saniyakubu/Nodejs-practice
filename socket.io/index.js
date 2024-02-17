import express from "express";
import http from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const App = express();
const server = http.createServer(App);
const io = new Server(server);
const PORT = 2000;

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(join(__dirname, "public", "index.html"));

App.get("/", (req, res) =>
  res.sendFile(join(__dirname, "public", "index.html"))
);

io.on("connection", () => {
  console.log("io server connected");
});

server.listen(PORT, () => console.log("server listening on port 200"));
