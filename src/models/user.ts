import mongoose from 'mongoose';
import { IUser, UserType } from '../interfaces/IUser';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    type: {
      type: String,
      enum: ['buyer', 'seller', 'logistics'],
      require: [true, 'Please enter user type'],
      default: 'buyer',
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
