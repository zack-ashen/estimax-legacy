import { Schema, model, Document, Types } from 'mongoose'
import { IUser, User } from './user'
import { LocationArea, LocationAreaSchema } from './location';

export interface IReview {
  reviewee: Types.ObjectId;
  reviewer: Types.ObjectId;
  title: string;
  description: string;
  photos: string[];
  rating: 1 | 2 | 3 | 4 | 5;
}

const ReviewSchema = new Schema<IReview>({
  reviewee: {
    type: Schema.Types.ObjectId,
    ref: 'Contractor',
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Homeowner',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { _id: false })

export interface IContractor extends IUser {
  businessName: string;
  contractorType: string[];
  phoneNumber: string;
  starredProjects: Types.ObjectId[];
  securedProjects: Types.ObjectId[];
  biddedProjects: Types.ObjectId[];
  invitedProjects: Types.ObjectId[];
  reviews: IReview[];
  searchRadius: number;
  location: LocationArea;
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
    ref: 'Project',
    default: []
  },
  biddedProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Project',
    default: []
  },
  securedProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Project',
    default: []
  },
  invitedProjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Project',
    default: []
  },
  reviews: {
    type: [ ReviewSchema ],
    default: []
  },
  searchRadius: {
    type: Number,
    default: 50
  },
  location: LocationAreaSchema
});

contractorSchema.index({ 'location.region' : '2dsphere' });

const Contractor = User.discriminator<IContractor>('Contractor', contractorSchema);

export default Contractor;