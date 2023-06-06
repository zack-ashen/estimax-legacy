import mongoose, { Schema } from 'mongoose';
import { ProjectStatus } from '../types';

export interface IProject extends Document {
  id: Schema.Types.ObjectId;
  homeowner_id: Schema.Types.ObjectId;
  description: String;
  category: Schema.Types.ObjectId[];
}

const projectSchema = new Schema({
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