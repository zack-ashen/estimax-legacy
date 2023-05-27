import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { PreAuth } from '../App'
import { User } from '../types';

// Define the shape of the context
interface AuthContextProps {
  user: User;
  signOut: () => void;
  token: string;
  useAuthReq: (url: string, options?: RequestOptions) => Promise<true | Response>;
}

interface AuthProviderProps extends React.PropsWithChildren {
  preAuthObj: PreAuth;
  removePreAuthObj: () => void;
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
export const AuthProvider = ({ preAuthObj, removePreAuthObj, children }: AuthProviderProps) => {
  const user = preAuthObj.user;
  const [token, setToken] = useState<string>(preAuthObj.token)
  const navigate = useNavigate()

  const signOut = () => {
    removePreAuthObj();
    navigate('/signin');
    fetch('/api/auth/signout', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const useAuthReq = async (url: string, options?: RequestOptions) => {
    const decodedToken = jwt_decode(token) as JwtPayload;
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
  
    const expirationDate = new Date(decodedToken.exp * 1000);
    if (expirationDate < new Date()) {
      fetch('/api/auth/refreshToken', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => {
          setToken(data.token);
        })
    }

    let headers = {
      'Authorization': `Bearer ${token}`,
    }
    if (options && options.headers) {
      headers = {
        ...headers,
        ...options.headers,
      }
    }

    return await fetch(url, {
      ...options,
      headers
    });
  };

  // Provide the user and authenticate function to the context
  return (
    <AuthContext.Provider value={{ user, signOut, token, useAuthReq }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};