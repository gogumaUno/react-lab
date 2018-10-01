import mongoose from 'mongoose';

import Avatar from './avatarSchema';

const UserSchema = new mongoose.Schema({
  profile: {
    type: Object,
    required: true,
    login: {
      type: String,
      required: true,
      min: [4, 'Too short login'],
      max: [15, 'Too long login'],
      unique: true,
    },
    avatar: {
      type: Object,
      data: Buffer,
      contentType: String,
      default : {},
    },
  },
  password: {
    type: String,
    required: true,
    min: [4, 'Too short password'],
    max: [15, 'Too long password'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
}, { minimize: false });

export default mongoose.model('User', UserSchema);
