import { createContext, useContext } from "react";
import { User } from "./AuthProvider";

interface AuthContextProps {
  user: User;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

// Create a hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
