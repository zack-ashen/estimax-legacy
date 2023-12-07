import { AnalyticsSnippet } from "@segment/analytics-next";

export interface AnalyticsWindow extends Window {
  analytics: AnalyticsSnippet;
}

export { type TokenPayload } from "./auth";
export { type Address, type Location, type LocationArea } from "./location";
export { type Bid, type Message, type Project } from "./project";
export { type Property } from "./property";
export { Role, type User } from "./user";
