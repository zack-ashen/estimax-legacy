import { Schema, model } from 'mongoose'
import { User } from './user'
import { Contractor } from './contractor'
import { Project } from './project'

export type HomeownerType = {

}

const homeownerSchema = User.discriminator('Homeowners', new Schema({
  preffered_contractors: [ Contractor ],
  posted_projects: [ Project ]

}))

export const Homeowner = homeownerSchema;