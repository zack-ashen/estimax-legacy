import { JwtPayload } from "jwt-decode";

export interface TokenPayload extends JwtPayload {
  userType: UserType; // Adjust the type according to your needs
  userId: string;
}

// User Schema
export type User = {
  uid: String,
  email: String,
  password: String,
  userType: UserType
}

export enum UserType {
  CONTRACTOR = "Contractor",
  HOMEOWNER = "Homeowner"
}