import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { JwtPayload } from "jsonwebtoken";

export enum Prices {
  LEAST_EXPENSIVE = "< $100",
  INEXPENSIVE = "< $500",
  MID_PRICED = "< $1,500",
  EXPENSIVE = "< $5,000",
  MORE_EXPENSIVE = "< $10,000",
  MOST_EXPENSIVE = "> $20,000",
}

export enum Timeline {
  ONE_HOUR = "One Hour",
  HALF_DAY = "Half a Day",
  ONE_DAY = "One Day",
  ONE_WEEK = "One Week",
  TWO_WEEKS = "Two Weeks",
  ONE_MONTH = "One Month",
  THREE_MONTHS = "Three Months",
  SIX_MONTHS = "Six Months",
  ONE_YEAR = "One Year",
  GREATER = "≥ Year",
}

// Auth Types
export interface TokenPayload extends JwtPayload {
  id: string;
  role: Role;
}

// User Schema
export enum Role {
  VENDOR = "vendor",
  PROPERTY_MANAGER = "propertyManager",
}

// Project
export enum ProjectStatus {
  DRAFTED = "Drafted",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface Review {
  reviewee: string;
  reviewer: string;
  title: string;
  description: string;
  photos: string[];
  rating: number;
}

export interface ProjectDraft {
  name: string;
  description: string;
  images: File[];
  category: string[];
  location: PlaceAutocompleteResult;
  projectTimeline: string;
}

// Misc
export enum Errors {
  USER_NOT_FOUND = "No user was found with that email. Create a user to get started.",
  INVALID_CRED = "Invalid email or password",
  INVALID_TOKEN = "Invalid access token",
  INVALID_REFRESH_TOKEN = "Invalid refresh token",
  INVALID_REFERRAL_CODE = "Invalid referral code",
  INVALID_REQUEST_BODY = "Invalid request body",
  EMAIl_EXISTS = "Email address already exists",
  RESOURCE_CREATION = "Failure to create resource",
  REFERRAL_CODE_USED = "Referral code has already been used before",
  FAILED_SET_TOKEN = "Failed to create and set access and refresh tokens.",
}
