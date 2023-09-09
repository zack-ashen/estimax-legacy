import { ObjectId, Schema, model } from 'mongoose'
import { IUser, User } from './user'

export interface IHomeowner extends IUser, Document {
  preferredContractors: ObjectId[];
  postedProjects: ObjectId[];
  finishedProjects: ObjectId[];
}

const homeownerSchema = User.discriminator('Homeowners', new Schema<IHomeowner>({
  preferredContractors: {
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