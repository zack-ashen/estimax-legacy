

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

export enum userType {
  CONTRACTOR,
  HOMEOWNER
}