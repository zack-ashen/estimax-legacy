import { User } from './user';

export interface Homeowner extends User {
    preferredContractors: string[];
    postedProjects: string[];
    finishedProjects: string[];
    friends: string[];
}