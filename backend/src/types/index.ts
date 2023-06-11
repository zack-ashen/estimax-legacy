import { JwtPayload } from "jsonwebtoken";
import {Schema} from "mongoose";


// Auth Types
export interface TokenPayload extends JwtPayload{
    uid: string;
    scope: Roles;
}
  
// User Schema
export enum Roles {
    CONTRACTOR = "Contractor",
    HOMEOWNER = "Homeowner"
}


// Project
export enum ProjectStatus {
    DRAFTED = "Drafted",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed"
}

// Misc
export enum Errors {
    USER_NOT_FOUND = 'User not found',
    INVALID_CRED = 'Invalid email or password',
    INVALID_TOKEN = 'Invalid access token',
    INVALID_REFRESH_TOKEN = 'Invalid refresh token',
    INVALID_REFERRAL_CODE = 'Invalid referral code',
    INVALID_REQUEST_BODY = 'Invalid request body',
    EMAIl_EXISTS = 'Email address already exists',
    RESOURCE_CREATION = 'Failure to create resource',
    REFERRAL_CODE_USED = "Referral code has already been used before",
    FAILED_SET_TOKEN = 'Failed to create and set access and refresh tokens.'
}