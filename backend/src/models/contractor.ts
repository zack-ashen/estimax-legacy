import { Schema, model } from 'mongoose'
import { IUser, User } from './user'
import { Review } from '../types';

export interface IContractor extends IUser {
  businessName: string;
  contractorType: string[];
  phoneNumber: string;
  invitations: string[];
  starredProjects: string[];
  securedProjects: string[];
  biddedProjects: string[];
  reviews: Review[];
}

const contractorSchema = User.discriminator('Contractors', new Schema({
  businessName: String,
  contractorType: {
    type:  [ String ],
    required: true,
    default: []
  },
  invitations: {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
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
  reviews: {
    type: [ 
      {
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
}))

export const Contractor = contractorSchema;