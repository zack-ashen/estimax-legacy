import { PropertyManagerDto, VendorDto } from "../../../types/dtos";

// Sign Up
export type SignUpRequest = {
  userDto:
    | (Omit<VendorDto, "password"> & { password: string }) // want to make password a required field
    | (Omit<PropertyManagerDto, "password"> & { password: string });
};

export type SignUpResponse = {
  token: string;
};

// Sign In
export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
};

// Google Auth
export type GoogleAuthRequest = {
  googleCredential: string;
  userDto?: Omit<VendorDto, "email"> | Omit<PropertyManagerDto, "email">;
};

export type GoogleAuthResponse = {
  userExists?: boolean;
  token?: string;
};

// Refresh Token
export type RefreshTokenResponse = {
  token: string;
};

// Check if email exists
export type CheckEmailRequest = {
  email: string;
};

export type CheckEmailResponse = {
  emailExists: boolean;
};
