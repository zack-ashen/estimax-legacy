import { ObjectId, Schema, model } from 'mongoose'
import { IUser, User } from './user'

export interface IHomeowner extends IUser {
  preferredContractors: ObjectId[];
  postedProjects: ObjectId[];
  finishedProjects: ObjectId[];
  friends: ObjectId[];
}

const homeownerSchema = User.discriminator('Homeowner', new Schema<IHomeowner>({
  preferredContractors: {
    type: [Schema.Types.ObjectId],
    ref: 'Contractor',
    default: []
  },
  postedProjects:  {
    type: [Schema.Types.ObjectId],
    ref: 'Project',
    default: []
  },
  finishedProjects:  {
    type: [Schema.Types.ObjectId],
    ref: 'Project',
    default: []
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'Homeowner',
    default: []
  }
}))

export const Homeowner = homeownerSchema;