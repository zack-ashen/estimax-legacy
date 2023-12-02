import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth/auth";
import { Role, TokenPayload } from "../../types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps extends React.PropsWithChildren {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const [accessToken, setAccessToken] = useState<string | undefined>(token);
  const [uid, setUid] = useState<string | undefined>();
  const [role, setRole] = useState<Role | undefined>();
  const [exp, setExp] = useState<number | undefined>();

  useEffect(() => {
    const decoded = jwt_decode<TokenPayload>(token);
    setUid(decoded.uid);
    setRole(decoded.role);
    setExp(decoded.exp);
  }, [token]);

  const signOut = async () => {
    setToken(undefined);
    await AuthService.signout();
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
