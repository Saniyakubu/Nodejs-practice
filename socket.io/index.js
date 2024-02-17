import express from "express";
import http from "http";
import { Server } from "socket.io";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const PORT = 2000;
const App = express();
// const httpServer = http.createServer(App);
const expressServer = App.listen(PORT, () => {
  console.log(`Server listening at port: http://localhost:${PORT}`);
});
// const io = new Server(httpServer);
const io = new Server(expressServer);

// const __dirname = dirname(fileURLToPath(import.meta.url));

App.use(express.static("public"));

io.on("connection", (client) => {
  console.log("io user is connected");
  client.on("message", (message) => {
    console.log(message);
    io.emit("message", `${client.id}: ${message}`);
  });

  client.on("disconnect", () => {
    io.emit("out", " user disconnected");
  });
});

// App.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "public", "index.html"));
// });

// httpServer.listen(PORT, () =>
//   console.log(`Server listening at port: http://localhost:${PORT}`)
// );
