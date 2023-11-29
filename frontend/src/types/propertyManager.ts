import { User } from "./user";


export type PropertyManager = User & {
    preferredContractors: string[];
    properties: string[];
    businessName: string;
};