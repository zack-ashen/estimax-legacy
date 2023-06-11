import mongoose, { Schema } from 'mongoose';
import { ProjectStatus } from '../types';

export interface IProject {
  id?: Schema.Types.ObjectId;
  name: string;
  homeowner_id: Schema.Types.ObjectId;
  description: String;
  category: Schema.Types.ObjectId[];
  status?: string; 
}

const projectSchema = new Schema<IProject>({
  name: String,
  homeowner_id: String,
  description: String,
  category: {
    type: [ Schema.Types.ObjectId ],
    ref: "Category"
  },
  status: {
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
    required: false
  }
  // todo: bids:
});

export const Project = mongoose.model('Projects', projectSchema)