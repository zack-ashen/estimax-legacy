import { JwtPayload } from "jwt-decode";
import { Role } from "./user";

export interface TokenPayload extends JwtPayload {
  role: Role;
  id: string;
  organization?: string;
}
