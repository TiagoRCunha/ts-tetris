import { Socket, Server as socketio } from "socket.io";

import * as express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const sockets = new socketio(server);

app.get('/', (_: express.Request, res: express.Response) => {
  res.send({ name: 'my-webpack-project', version: '1.0.0', message: 'Hello World!' })
})

sockets.on("connection", (socket: Socket) => {
  console.log(socket);
});

export default app;


