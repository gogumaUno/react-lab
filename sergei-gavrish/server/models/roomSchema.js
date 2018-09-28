import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  title: String,
  messages: [String],
  users: []
});

export default mongoose.model('Room', RoomSchema);
