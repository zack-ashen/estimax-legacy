import mongoose from 'mongoose';
const { Schema } = mongoose;

export type ProjectType = {

}

const projectSchema = new Schema({
  id: {
    type: String,
    required: true,
    hashKey: true,
    unique: true
  },
  name: String,
  homeowner_id: String,
  description: String,
  category: {
    type: String,
    enum: ['Carpentry', 'General Contractor', 'Carpentry']
  },
  status: {
    type: String,
    enum: ['In Progress', 'Completed']
  }
  // todo: bids:
});

export const Project = mongoose.model('Projects', projectSchema)