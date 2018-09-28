import express from 'express';
import cors from 'cors';
import http from 'http';
import SocketIO from 'socket.io';
import bodyParser from 'body-parser'

import { SERVERPORT } from './config/config';
import AuthController from './controllers/AuthController';

const app = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', AuthController);

const server = http.createServer(app);
const io = SocketIO(server);

io.on('connection', client => {
  console.log(`${client.id} connected`);

  client.on('join', room =>{
    console.log(`${client.id} connected to room ${room}`)
    client.join(room);
  })

  client.on('message', obj => {
    io.to(obj.room).emit('recieve_message', obj.message)
  })

  client.on('disconnect', () => {
    console.log(`${client.id} disconnect`);
  })

});

server.listen(SERVERPORT, error => {
  if (error) throw error;
  console.log(`Listening on port ${SERVERPORT}`);
});
