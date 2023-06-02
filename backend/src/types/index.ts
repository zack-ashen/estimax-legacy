

export interface TokenPayload {
    userId: string;
    scope: UserType;
    tokenVersion: Number;
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