import { JwtPayload } from "jwt-decode";
import { MultiValue } from "react-select";

export interface TokenPayload extends JwtPayload {
  role: Roles; // Adjust the type according to your needs
  userId: string;
}

export interface Location {
  longitude: number;
  latitude: number;
}

export interface Review {
  reviewee: string;
  reviewer: string;
  title: string;
  description: string;
  photos: string[];
  rating: number;
}

// Project Schema
export type Project = {
  id: string;
  homeowner_id: string;
  description: string;
  category: string[];
}

// User Schema

// An AuthUser is a user that is not built yet but is sent to the backend
// so there is no id field
export interface AuthUser {
  name?: string;
  email?: string;
  role: Roles;
  location?: Location;
  searchRadius?: number;
  bio?: string;
  profilePhoto?: string;
}

export interface AuthContractor extends AuthUser {
  businessName: string;
  contractorType: string[];
  phoneNumber: string;
  invitations: string[];
  starredProjects: string[];
  securedProjects: string[];
  biddedProjects: string[];
  reviews: Review[];
}

export interface AuthHomeowner extends AuthUser {
  preferredContractors: string[];
  postedProjects: string[];
  finishedProjects: string[];
}

export interface Homeowner extends AuthHomeowner {
  uid: string;
  name: string;
  email: string;
}

export interface Contractor extends AuthContractor {
  uid: string;
  name: string;
  email: string;
}

export interface User {
  uid: string,
  email: string,
  password?: string,
  role: Roles,
}

export enum Roles {
  CONTRACTOR = "Contractor",
  HOMEOWNER = "Homeowner"
}

export type OptionType = {
  value: string;
  label: string;
};

export const contractorTypes: MultiValue<OptionType> = [
  {value: 'General Contractor', label: 'General Contractor'},
  {value: 'Handyman Services', label: 'Handyman Services'},
  {value: 'Home Cleaning', label: 'Home Cleaning'},
  {value: 'Carpentry', label: 'Carpentry'},
  {value: 'Electrician', label: 'Electrician'},
  {value: 'Plumbing', label: 'Plumbing'},
  {value: 'Exterminator', label: 'Exterminator'},
  {value: 'Landscaping', label: 'Landscaping'},
  {value: 'Painting', label: 'Painting'},
  {value: 'Roofing', label: 'Roofing'},
  {value: 'Fencing', label: 'Fencing'},
  {value: 'TV Mounting', label: 'TV Mounting'},
  {value: 'Furniture Assembly', label: 'Furniture Assembly'}
]

export interface FormError {
  [error: string]: string | undefined,
}

export interface FormErrors {
  [key: string]: any;
};