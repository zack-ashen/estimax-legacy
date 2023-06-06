import { JwtPayload } from "jwt-decode";

export interface TokenPayload extends JwtPayload {
  role: Roles; // Adjust the type according to your needs
  userId: string;
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