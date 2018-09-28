import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  user: String,
  content: String,
  room: String
})

export default mongoose.model('Message', MessageSchema);
