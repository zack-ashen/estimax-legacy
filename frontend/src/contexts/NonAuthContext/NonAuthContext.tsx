import { createContext, useContext } from "react";

interface NonAuthContextProps {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const NonAuthContext = createContext<NonAuthContextProps | null>(null);

export const useNonAuth = () => {
  const context = useContext(NonAuthContext);
  if (context === null) {
    throw new Error("useNonAuth must be used within an NonAuthProvider");
  }
  return context;
};
