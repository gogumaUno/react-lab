import mongoose from 'mongoose';

const AvatarSchema = new mongoose.Schema({
  avatar: {
    type: Object,
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model('Avatar', AvatarSchema);
