import { JwtPayload } from "jwt-decode";

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