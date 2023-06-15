import { JwtPayload } from "jwt-decode";
import { MultiValue } from "react-select";

export interface TokenPayload extends JwtPayload {
  role: Roles; // Adjust the type according to your needs
  userId: string;
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
export type AuthUser = {
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  role?: Roles,
  referral?: string,
}

export interface User {
  uid: string,
  email: string,
  password?: string,
  role: Roles
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