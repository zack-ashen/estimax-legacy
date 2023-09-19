import mongoose, { Schema, Document } from 'mongoose';
import { Roles } from '../types';

export interface MessageThread {
  recipient: Schema.Types.ObjectId;
  messages: Message[];
  projectId?: string;
}

export interface Message {
  messageText: string;
  timestamp: Date;
  sender: boolean;
}

const MessageSchema = new Schema<Message>({
  messageText: String,
  timestamp: Date,
  sender: Boolean
})

const MessageThreadSchema = new Schema<MessageThread>({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: {
    type: [ MessageSchema ],
    default: []
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: false
  }
})

export interface IUser {
  uid: string;
  email: string;
  password?: string;
  role: Roles;
  name: string;
  location?: string;
  searchRadius?: number;
  bio?: string;
  profilePhoto?: string;
  messages?: MessageThread;
}

interface IUserDocument extends IUser, Document {
  __t?: string;
}

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String },
  location: { type: String, required: false },
  searchRadius: { type: String, required: false },
  bio: { type: String, required: false },
  profilePhoto: { type: String, required: false },
  messages: {
    type: [ MessageThreadSchema ],
    default: []
  }
}, {
  toJSON: { virtuals: true },
  toObject: { 
    transform: function (_, ret) {
      delete ret.password;
      delete ret.__v;
      delete ret.__t;
      delete ret._id;
      return ret
    },
    virtuals: true 
  }
});

userSchema.virtual('uid').get(function() {
  return this._id;
});

userSchema.virtual('role').get(function () {
  return this.__t;
});

export const User = mongoose.model('User', userSchema)