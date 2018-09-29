import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  room: String,
  date: Date,
})

export default mongoose.model('Message', MessageSchema);
