import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth/auth";
import { Role, TokenPayload } from "../../types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps extends React.PropsWithChildren {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface UserDetails {
  id: string;
  role: Role;
  orgId?: string;
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
  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    const decoded = jwt_decode<TokenPayload>(token);
    return {
      id: decoded.uid,
      role: decoded.role,
      orgId: decoded.orgId ? decoded.orgId : undefined,
    };
  });

  useEffect(() => {
    // Decode the token again to get the latest user info
    const decodedUser = jwt_decode<TokenPayload>(accessToken);
    if (userDetails.role !== decodedUser.role) {
      console.log("Role change detected. Logging out.");
      signout(); // Call your signout function
    }

    // Update the current user state
    setUserDetails({
      id: decodedUser.uid,
      role: decodedUser.role,
      orgId: decodedUser.orgId ? decodedUser.orgId : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]); // This effect runs when accessToken changes

  const signout = async () => {
    setToken(undefined);
    await AuthService.signout();
  };

  return (
    <AuthContext.Provider value={{ userDetails, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
