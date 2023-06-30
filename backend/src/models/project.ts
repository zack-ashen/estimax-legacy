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
  lowestBid: number;
  bids: Schema.Types.ObjectId[];
  timeline: string;
}

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
    type: [ Schema.Types.ObjectId ],
    default: []
  },
  timeline: String
});

export const Project = mongoose.model('Projects', projectSchema)