import { Schema, model } from 'mongoose'
import { IUser, User } from './user'
import { Project } from './project'

export interface IContractor extends IUser {
  
}

const contractorSchema = User.discriminator('Contractors', new Schema({
  companyName: String,
  contractorType: {
    type: String,
    enum: ['General Contractor', 'Plumber', 'Gardener', 'Carpenter'],
    default: 'General Contractor'
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