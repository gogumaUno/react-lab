import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
  title: String
})

export default mongoose.model('Room', roomSchema);
