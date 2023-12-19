import { Location } from "./location";
import { Media } from "./media";

export type Property = {
  id: string;
  name: string;
  location: Location;
  organization: string;
  vendors?: string[];
  media: Media[];
  type: string;
  description?: string;
  projects: string[];
  activeProjects: string[];
};
