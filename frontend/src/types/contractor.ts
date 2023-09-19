import { User } from './user';


export interface Contractor extends User {
    businessName: string;
    contractorType: string[];
    phoneNumber: string;
    starredProjects: string[];
    securedProjects: string[];
    biddedProjects: string[];
    invitedProjects: string[];
    reviews: Review[];
  }

export interface Review {
    reviewee: string;
    reviewer: string;
    title: string;
    description: string;
    photos: string[];
    rating: 1 | 2 | 3 | 4 | 5;
}