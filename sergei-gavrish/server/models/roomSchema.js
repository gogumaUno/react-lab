import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
});

export default mongoose.model('Room', RoomSchema);
