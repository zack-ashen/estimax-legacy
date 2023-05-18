import { Schema, model } from 'mongoose'
import { User } from './user'
import { Contractor } from './contractor'
import { Project } from './project'

export type HomeownerType = {

}

const homeownerSchema = User.discriminator('Homeowners', new Schema({
  prefferedContractors: [ Contractor ],
  postedProjects: [ Project ]

}))

export const Homeowner = homeownerSchema;