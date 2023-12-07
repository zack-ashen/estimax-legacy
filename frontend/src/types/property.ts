import { Location } from "./location";

export type Property = {
  id: string;
  name: string;
  location: Location;
  organization: string;
  vendors?: string[];
  media?: string[];
  type: string;
  description?: string;
  projects: string[];
  activeProjects: string[];
};
