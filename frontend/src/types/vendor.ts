import { User } from "./user";

export type Vendor = User & {
  businessName: string;
  phone: string;
  location: string;
  services: string;
  invitations: string[];
};
