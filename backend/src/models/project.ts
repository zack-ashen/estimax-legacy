import mongoose, { Schema } from 'mongoose';
import { ProjectStatus } from '../types';

export interface IProject {
  id: Schema.Types.ObjectId;
  name: string;
  homeowner_id: Schema.Types.ObjectId;
  description: String;
  location: String;
  category: String[];
  status: string; 
  images: string[];
  lowestBid: IBid;
  bids: IBid[];
  timeline: string;
  messages: IMessage[];
  invitedContractors: Schema.Types.ObjectId;
}

enum BidStatus {
  Accepted = 'Accepted',
  Overriden = 'Overriden',
  Declined = 'Declined',
  UnderReview = 'Under Review'
}

export interface MessageText {
  poster: string;
  posterName: string;
  timestamp: Date;
  messageText: string;
}

export interface IMessage {
  message: MessageText;
  replies: MessageText[]
}

const MessageTextSchema = new Schema<MessageText>({
  poster: String,
  posterName: String,
  timestamp: Date,
  messageText: String
}, { _id: false })

const MessageSchema = new Schema<IMessage>({
  message: {
    type: MessageTextSchema
  },
  replies: {
    type: [ MessageTextSchema ],
    default: []
  }
})

export interface IBid {
  contractorId: string;
  time: Date;
  amount: number;
  description: string;
  status: BidStatus;
  expiration: Date;
}

const BidSchema = new Schema<IBid>({
  contractorId: String,
  time: Date,
  amount: Number,
  description: String,
  status: {
    type: String,
    enum: Object.values(BidStatus),
    default: BidStatus.UnderReview
  },
  expiration: Date,
}, { _id: false })

const projectSchema = new Schema<IProject>({
  name: String,
  homeowner_id: Schema.Types.ObjectId,
  description: String,
  category: [ String ],
  status: {
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
  },
  location: String, 
  images: [ String ],
  bids: {
    type: [ BidSchema ],
    default: []
  },
  lowestBid: {
    type: BidSchema,
    required: false
  },
  messages: {
    type: [ MessageSchema ],
    default: []
  },
  timeline: String,
  invitedContractors: {
    type: [ Schema.Types.ObjectId ],
    ref: 'Contractors',
    default: []
  }
});

export const Project = mongoose.model('Projects', projectSchema);