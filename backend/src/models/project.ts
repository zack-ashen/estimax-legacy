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
}

enum BidStatus {
  Accepted = 'Accepted',
  Overriden = 'Overriden',
  Declined = 'Declined',
  UnderReview = 'Under Review'
}

export interface IMessage {
  poster: string;
  timestamp: Date;
  messageText: string;
}

const MessageSchema = new Schema<IMessage>({
  poster: String,
  timestamp: Date,
  messageText: String
}, { _id: false })

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
  timeline: String
});

export const Project = mongoose.model('Projects', projectSchema)