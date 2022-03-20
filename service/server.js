const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static("public"));

sockets.on("connection", (socket) => {
  console.log(socket);
});

server.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
