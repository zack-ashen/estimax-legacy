import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth/auth";
import { Role, TokenPayload } from "../../types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps extends React.PropsWithChildren {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface User {
  id: string;
  role: Role;
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
  children,
}: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>(token);
  const [user, setUser] = useState<User>(() => {
    const decoded = jwt_decode<TokenPayload>(token);
    return {
      id: decoded.uid,
      role: decoded.role,
    };
  });

  useEffect(() => {
    // Decode the token again to get the latest user info
    const decodedUser = jwt_decode<TokenPayload>(accessToken);
    if (user.role !== decodedUser.role) {
      console.log("Role change detected. Logging out.");
      signout(); // Call your signout function
    }

    // Update the current user state
    setUser({
      id: decodedUser.uid,
      role: decodedUser.role,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]); // This effect runs when accessToken changes

  const signout = async () => {
    setToken(undefined);
    await AuthService.signout();
  };

  return (
    <AuthContext.Provider value={{ user, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
