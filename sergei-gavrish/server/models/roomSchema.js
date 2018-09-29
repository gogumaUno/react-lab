import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  title: String,
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

export default mongoose.model('Room', RoomSchema);
