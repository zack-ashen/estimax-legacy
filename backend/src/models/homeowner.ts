import { Schema, model } from 'mongoose'
import { User } from './user'

export type HomeownerType = {
  preferredContractors: string[];
  postedProjects: string[];
  finishedProjects: string[];
}

const homeownerSchema = User.discriminator('Homeowners', new Schema({
  prefferedContractors: {
    type: [Schema.Types.ObjectId],
    ref: 'Contractors',
    default: []
  },
  postedProjects:  {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
  finishedProjects:  {
    type: [Schema.Types.ObjectId],
    ref: 'Projects',
    default: []
  },
}))

export const Homeowner = homeownerSchema;