import { Schema, model } from 'mongoose'
import { User } from './user'
import { Project } from './project'

export type ContractorType = {

}

const contractorSchema = User.discriminator('Contractors', new Schema({
  companyName: String,
  invitations: [ Project ],
  contractorType: {
    type: String,
    enum: ['General Contractor', 'Plumber', 'Gardener', 'Carpenter'],
    default: 'General Contractor'
  },
  starredProjects: [ Project ],
  securedProjects: [ Project ],
  biddedProjects: [ Project ],
  reviews: [ {
    bio: String,
    uid: String,
    stars: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 5
    }
  } ]
}))

export const Contractor = contractorSchema;