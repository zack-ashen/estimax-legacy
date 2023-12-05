import { AnalyticsSnippet } from "@segment/analytics-next";
import { JwtPayload } from "jwt-decode";
import { Role } from "./user";

export interface TokenPayload extends JwtPayload {
  role: Role;
  uid: string;
  orgId: string;
}

// export interface Review {
//   reviewee: string;
//   reviewer: string;
//   title: string;
//   description: string;
//   photos: string[];
//   rating: number;
// }

// export type Message = {
//   message: {
//     posterName: string;
//     poster: string;
//     timestamp: Date;
//     messageText: string;
//   }
//   replies: []
// }

// // Project Schema
// export type Project = {
//   _id: string;
//   name: string;
//   homeowner_id: string;
//   description: string;
//   category: string[];
//   lowestBid: Bid;
//   bids: Bid[];
//   images: string[];
//   location: string;
//   timeline: string;
//   messages: Message[];
//   invitedContractors: string[];
//   status?: string;
// }

// export interface ProjectDraft {
//   name: string;
//   description: string;
//   images: File[];
//   category: string[];
//   location: string;
//   projectTimeline: string;
// }

export interface Location {
  area: string;
  address: Address;
  point: [number, number]; // long and lat
  placeId: string;
}

export interface LocationArea {
  name: string;
  region: {
    type: "Polygon";
    coordinates: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ];
  };
  placeId: string;
}

export interface Address {
  unit?: string;
  addressLine1: string;
  addressLine2: string;
  postalCode?: string;
}

export interface AnalyticsWindow extends Window {
  analytics: AnalyticsSnippet;
}

export { type Bid, type Message, type Project } from "./project";
export { Role, type User } from "./user";
