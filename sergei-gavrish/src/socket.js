import io from 'socket.io-client';

import PORT from './config';

export default () => {
  const socket = io.connect(`http://localhost:${PORT}`)
} 