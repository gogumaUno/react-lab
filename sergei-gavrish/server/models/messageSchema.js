import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
})

export default mongoose.model('Message', MessageSchema);
