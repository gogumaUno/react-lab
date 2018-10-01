import express from 'express';
import cors from 'cors';
import http from 'http';
import SocketIO from 'socket.io';
import bodyParser from 'body-parser'

import { SERVERPORT } from './config/config';
import AuthController from './controllers/authController';
import UserController from './controllers/userController';
import RoomsController from './controllers/roomsController';
import Message from './models/messageSchema';
import Room from './models/roomSchema';

const app = express();
app.use(cors());
app.use('/api/auth', AuthController);
app.use('/api/user', UserController);
app.use('/api/rooms', RoomsController);
// app.use('/api/messages', MessagesController);

const server = http.createServer(app);
app.io = SocketIO(server);

app.io.on('connection', client => {
  console.log(`${client.id} connected`);

  client.on('join', room => {
    console.log(`${client.id} connected to room ${room}`)
    client.join(room);
    Room
      .find(
        { title: room },
        {
          users: 0,
          _id: 0,
          title: 0,
        }
      )
      .populate({
        path: 'messages',
        model: 'Message',
        select: '_id text timeStamp user'
      })
      .then(room => {
        console.log(room[0] && room[0].messages || [])
        client.emit('joined_room', room[0] && room[0].messages || [])
      })
      .catch(err => console.error(err))
  })

  client.on('leave', room => {
    console.log(`${client.id} disconnected from room ${room}`);
    client.leave(room);
  })

  client.on('message', obj => {
    console.log(obj);
    Message
      .create({
        user: obj.user,
        text: obj.text,
        timeStamp: Date.now(),
      })
      .then(message => {
        Room
        .findOneAndUpdate({ title: obj.room }, { $push: { messages: message._id } }, { 'new': true})
        .then(() => {
          console.log(app.io.to(obj.room));
          app.io.to(obj.room).emit('recieve_message', message)})
      })
      
    })
    
    client.on('disconnect', () => {
      console.log(`${client.id} disconnect`);
    })
    
  });

  app.io.on('NEW_ROOM', room => {
    console.log(room);
  })
  
  server.listen(SERVERPORT, error => {
    if (error) throw error;
    console.log(`Listening on port ${SERVERPORT}`);
  });
  