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
export type User = {
  uid: String,
  email: String,
  password: String,
  role: Roles
}

export enum Roles {
  CONTRACTOR = "Contractor",
  HOMEOWNER = "Homeowner"
}