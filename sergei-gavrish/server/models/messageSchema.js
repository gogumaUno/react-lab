import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  user: String,
  content: String,
  room: String,
  image: String 
})

export default mongoose.model('Message', messageSchema);
