import express from 'express';
import cors from 'cors';
import http from 'http';
import SocketIO from 'socket.io';

import PORT from '../config';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = SocketIO(server);

io.on('connection', client => {
  console.log(`${client} connected`);

  client.on('disconnect', () => {
    console.log(`${client} disconnect`);
  })

});

server.listen(PORT, error => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
})
