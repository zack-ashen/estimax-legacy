import { Schema, model, Document, Types } from 'mongoose'
import { IUser, User } from './user'

export interface Review {
  bio?: string;
  uid?: string;
  stars?: 1 | 2 | 3 | 4 | 5;
}

export interface IContractor extends IUser, Document {
  businessName: string;
  contractorType: string[];
  phoneNumber: string;
  starredProjects: Types.ObjectId[];
  securedProjects: Types.ObjectId[];
  biddedProjects: Types.ObjectId[];
  invitedProjects: Types.ObjectId[];
  reviews: Review[];
}

const contractorSchema = new Schema({
  businessName: String,
  contractorType: {
    type: [String],
    required: true,
    default: []
  },
  phoneNumber: String,
  starredProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
  biddedProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
  securedProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
  invitedProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
  reviews: {
    type: [{
      bio: String,
      uid: String,
      stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5
      }
    }],
    default: []
  }
});

const Contractor = User.discriminator<IContractor>('Contractor', contractorSchema);

export default Contractor;