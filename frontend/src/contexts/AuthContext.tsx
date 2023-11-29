import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { PropertyManager } from "../types/propertyManager";
import { Vendor } from "../types/vendor";

// Define the shape of the context
interface AuthContextProps {
  user: Vendor | PropertyManager;
  signOut: () => void;
  token: string;
  useAuthReq: () => (
    url: string,
    options?: RequestOptions
  ) => Promise<Response | undefined>;
}

interface AuthProviderProps extends React.PropsWithChildren {
  user: Vendor | PropertyManager;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  removeToken: () => void;
}

// Create the context with initial value
const AuthContext = createContext<AuthContextProps | null>(null);

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

/*
 * -- Auth Provider --
 * Provides state for the user and access token.
 * Preconditions: token is a valid JWT token and there is a refresh token present.
 * However, token might be expired.
 */
export const AuthProvider = ({
  token,
  setToken,
  removeToken,
  user,
  children,
}: AuthProviderProps) => {
  const navigate = useNavigate();

  const signOut = () => {
    removeToken();
    navigate("/signin");
    fetch("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const useAuthReq = () => {
    return async (url: string, options?: RequestOptions) => {
      const decodedToken = jwt_decode(token) as JwtPayload;
      if (!decodedToken || !decodedToken.exp) {
        console.error("No decoded token or no expiry in decoded token");
        return;
      }

      const expirationDate = new Date(decodedToken.exp * 1000);
      if (expirationDate < new Date()) {
        fetch("/api/auth/refreshToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setToken(data.token);
          });
      }

      let headerBase = { Authorization: `Bearer ${token}` };
      let headers;

      if (!(options && options.body instanceof FormData)) {
        headers = {
          ...headerBase,
          "Content-Type": "application/json",
        };
      } else {
        headers = { ...headerBase };
      }

      if (options && options.headers) {
        headers = {
          ...headers,
          ...options.headers,
        };
      }

      return await fetch(url, {
        ...options,
        headers,
      });
    };
  };

  // Provide the user and authenticate function to the context
  return (
    <AuthContext.Provider value={{ user, signOut, token, useAuthReq }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    return false;
  }
  return true;
};

// Create a hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
