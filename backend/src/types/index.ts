

// Auth Types
export interface TokenPayload {
    userId: String;
    scope: UserTypes;
}
  
// User Schema
export type UserType = {
    uid: String,
    email: String,
    password?: String,
    userType: UserTypes
}
  
export enum UserTypes {
    CONTRACTOR = "Contractor",
    HOMEOWNER = "Homeowner"
}


// Project
export type Project = {

}


// Misc
export interface Error {
    message: Errors;
}

export enum Errors {
    USER_NOT_FOUND = "User not found",
    INVALID_CRED = "Invalid email or password",
    INVALID_TOKEN = "Invalid access token",
    INVALID_REFRESH_TOKEN = "Invalid refresh token"
}