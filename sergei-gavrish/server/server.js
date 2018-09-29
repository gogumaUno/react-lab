import express from 'express';
import cors from 'cors';
import http from 'http';
import SocketIO from 'socket.io';
import bodyParser from 'body-parser'

import { SERVERPORT } from './config/config';
import AuthController from './controllers/authController';
import UsersController from './controllers/usersController';
import RoomsController from './controllers/roomsController';
import Message from './models/messageSchema';

const app = express();
app.use(cors());
app.use('/api/auth', AuthController);
app.use('/api/users', UsersController);
app.use('/api/rooms', RoomsController);
// app.use('/api/messages', MessagesController);

const server = http.createServer(app);
const io = SocketIO(server);

io.on('connection', client => {
  console.log(`${client.id} connected`);

  client.on('join', room =>{
    console.log(`${client.id} connected to room ${room}`)
    client.join(room);
  })

  client.on('message', obj => {
    Message
      .create({
        user: obj.user,
        message: obj.message,
        room: obj.room,
        date: Date.now(),
      })
      .then(message => io.to(message.room).emit('recieve_message', message))
  })

  client.on('disconnect', () => {
    console.log(`${client.id} disconnect`);
  })

});

server.listen(SERVERPORT, error => {
  if (error) throw error;
  console.log(`Listening on port ${SERVERPORT}`);
});
