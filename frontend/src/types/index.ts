import { JwtPayload } from "jwt-decode";

export interface TokenPayload extends JwtPayload {
  userType: UserType; // Adjust the type according to your needs
  userId: string;
  tokenVersion: Number;
}

export enum UserTypes {
  CONTRACTOR,
  HOMEOWNER
}


// User Schema
export type User = {
  uid: String,
  email: String,
  password: String
}

export enum UserType {
  CONTRACTOR = "Contractor",
  HOMEOWNER = "Homeowner"
}