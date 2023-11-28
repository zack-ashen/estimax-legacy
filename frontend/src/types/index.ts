
import { JwtPayload } from "jwt-decode";
import { MultiValue } from "react-select";
import { AnalyticsSnippet } from "@segment/analytics-next"

import { Roles } from './user';
import { Contractor } from "./contractor";
import { Homeowner } from "./homeowner";


// Auth
export type ContractorNoUid = Omit<Contractor, 'uid' | 'searchRadius'> & { location: Obj };
export type HomeownerNoUid = Omit<Homeowner, 'uid'>;


export interface TokenPayload extends JwtPayload {
  role: Roles;
  uid: string;
}
// export interface Review {
//   reviewee: string;
//   reviewer: string;
//   title: string;
//   description: string;
//   photos: string[];
//   rating: number;
// }

// export type Message = {
//   message: {
//     posterName: string;
//     poster: string;
//     timestamp: Date;
//     messageText: string;
//   }
//   replies: []
// }

// // Project Schema
// export type Project = {
//   _id: string;
//   name: string;
//   homeowner_id: string;
//   description: string;
//   category: string[];
//   lowestBid: Bid;
//   bids: Bid[];
//   images: string[];
//   location: string;
//   timeline: string;
//   messages: Message[];
//   invitedContractors: string[];
//   status?: string;
// }

// export interface ProjectDraft {
//   name: string;
//   description: string;
//   images: File[];
//   category: string[];
//   location: string;
//   projectTimeline: string;
// }

// User Schema

// An AuthUser is a user that is not built yet but is sent to the backend
// so there is no id field
// export interface AuthUser {
//   name?: string;
//   email?: string;
//   role: Roles;
//   location?: Locations;
//   searchRadius?: number;
//   bio?: string;
//   profilePhoto?: string;
// }

// export interface AuthContractor extends AuthUser {
//   businessName: string;
//   contractorType: string[];
//   phoneNumber: string;
//   starredProjects: string[];
//   securedProjects: string[];
//   biddedProjects: string[];
//   invitedProjects: string[];
//   reviews: Review[];
// }

// export interface AuthHomeowner extends AuthUser {
//   preferredContractors: string[];
//   postedProjects: string[];
//   finishedProjects: string[];
// }

// export interface Homeowner extends AuthHomeowner {
//   uid: string;
//   name: string;
//   email: string;
// }

// export interface Contractor extends AuthContractor {
//   uid: string;
//   name: string;
//   email: string;
// }

// export interface User {
//   uid: string,
//   name: string,
//   email: string,
//   password?: string,
//   role: Roles,
// }

// export enum Roles {
//   CONTRACTOR = "Contractors",
//   HOMEOWNER = "Homeowners"
// }

export type OptionType = {
  value: string;
  label: string;
};

export const ContractorTypes = {
  GENERAL_CONTRACTOR: 'General Contractor',
  HANDYMAN_SERVICES: 'Handyman Services',
  HOME_CLEANING: 'Home Cleaning',
  CARPENTRY: 'Carpentry',
  ELECTRICIAN: 'Electrician',
  PLUMBING: 'Plumbing',
  EXTERMINATOR: 'Exterminator',
  LANDSCAPING: 'Landscaping',
  PAINTING: 'Painting',
  ROOFING: 'Roofing',
  FENCING: 'Fencing',
  TV_MOUNTING: 'TV Mounting',
  FURNITURE_ASSEMBLY: 'Furniture Assembly'
} as const;

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

export interface Location {
  area: string;
  address: Address;
  point: [number, number]; // long and lat
  placeId: string;
}

export interface LocationArea {
  name: string;
  region: {
      type: 'Polygon';
      coordinates: [[number, number], [number, number], [number, number], [number, number]];
  };
  placeId: string;
}


export interface Address {
  unit?: string;
  addressLine1: string;
  addressLine2: string;
  postalCode?: string;
}

export type Obj = {[key: string]: any};


export interface FormError {
  [error: string]: string | undefined,
}

export interface FormErrors {
  [key: string]: any;
};

export enum Locations {
  ITHACA='Ithaca, NY',
  BROOKLYN='Brooklyn, NY',
  MANHATTAN='Manhattan, NY',
  QUEENS='Queens, NY',
  BRONX='Bronx, NY',
  STATENISLAND='Staten Island, NY',
  WESTFIELD='Westfield, NJ'
}

export const locations: MultiValue<OptionType> = [
  {value: 'Brooklyn, NY', label: 'Brooklyn, NY'},
  {value: 'Manhattan, NY', label: 'Manhattan, NY'},
  {value: 'Queens, NY', label: 'Queens, NY'},
  {value: 'Bronx, NY', label: 'Bronx, NY'},
  {value: 'Staten Island, NY', label: 'Staten Island, NY'},
  {value: 'Westfield, NJ', label: 'Westfield, NJ'},
]

export enum Prices {
  LEAST_EXPENSIVE = '< $100',
  INEXPENSIVE = '< $500',
  MID_PRICED = '< $1,500',
  EXPENSIVE = '< $5,000',
  MORE_EXPENSIVE = '< $10,000',
  MOST_EXPENSIVE = '> $20,000'
}

export enum Timeline {
  ONE_HOUR = 'One Hour',
  HALF_DAY = 'Half a Day',
  ONE_DAY = 'One Day',
  ONE_WEEK = 'One Week',
  TWO_WEEKS = 'Two Weeks',
  ONE_MONTH = 'One Month',
  THREE_MONTHS = 'Three Months',
  SIX_MONTHS = 'Six Months',
  ONE_YEAR = 'One Year',
  GREATER = '≥ Year'
}

export const projectTypes: MultiValue<OptionType> = [
  {value: 'Home Renovation', label: 'Home Renovation'},
  {value: 'Cleaning', label: 'Cleaning'},
  {value: 'Landscaping', label: 'Landscaping'},
  {value: 'Multi-Unit Renovation', label: 'Multi-Unit Renovation'},
  {value: 'Large Construction', label: 'Large Construction'},
  {value: 'Roofing', label: 'Roofing'},
  {value: 'Electrical', label: 'Electrical'},
  {value: 'Plumbing', label: 'Plumbing'},
  {value: 'Maintenance', label: 'Maintenance'},
  {value: 'Masonry/Concrete', label: 'Masonry/Concrete'},
  {value: 'Flooring', label: 'Flooring'},
  {value: 'Moving', label: 'Moving'},
  {value: 'Painting', label: 'Painting'},
  {value: 'Insulation', label: 'Insulation'},
  {value: 'Lighting', label: 'Lighting'},
  {value: 'Home Automation', label: 'Home Automation'}
]

// export interface Bid {
//   contractorId: string;
//   time: Date;
//   amount: number;
//   description: string;
//   status: 'Accepted' | 'Overriden' | 'Declined' | 'Under Review';
//   expiration: Date;
// }

// export const ReviewStars = {
//   ONE_STAR: 'One Star',
//   TWO_STAR: 'Two Stars',
//   THREE_STAR: 'Three Stars',
//   FOUR_STAR: 'Four Stars',
//   FIVE_STAR: 'Five Stars'
// } as const;

export interface AnalyticsWindow extends Window {
  analytics: AnalyticsSnippet
}

export { type User, Roles } from "./user";
export { type Homeowner } from "./homeowner";
export { type Contractor, type Review } from "./contractor";
export { type Project, type Bid, type Message, type ProjectDraft } from "./project";