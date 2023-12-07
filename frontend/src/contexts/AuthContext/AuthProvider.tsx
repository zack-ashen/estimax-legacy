import { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth/auth";
import { api } from "../../services/config/axiosConfigs";
import { Role, TokenPayload } from "../../types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps extends React.PropsWithChildren {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface UserDetails {
  id: string;
  role: Role;
  organization?: string;
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
  const [interceptorId, setInterceptorId] = useState<{
    resId?: number;
    reqId?: number;
  }>({});
  const [accessToken, setAccessToken] = useState<string>(token);
  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    const decoded = jwt_decode<TokenPayload>(token);
    return {
      id: decoded.uid,
      role: decoded.role,
      organization: decoded.organization ? decoded.organization : undefined,
    };
  });

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Normal response, return it to be processed
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Check if the response is 401 and it's not a retry
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const { token } = await AuthService.refreshToken(); // Refresh the token
          setAccessToken(token); // Update token in context
          originalRequest.headers["Authorization"] = "Bearer " + token; // Update the header
          return api(originalRequest); // Retry the original request with the new token
        }

        return Promise.reject(error);
      }
    );
    setInterceptorId({ resId: responseInterceptor, reqId: requestInterceptor });

    return () => {
      // Eject interceptors on unmount
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      organization: decodedUser.organization
        ? decodedUser.organization
        : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]); // This effect runs when accessToken changes

  const signout = async () => {
    const { resId, reqId } = interceptorId;
    reqId && api.interceptors.request.eject(reqId);
    resId && api.interceptors.response.eject(resId);
    setToken(undefined);
    await AuthService.signout();
  };

  return (
    <AuthContext.Provider
      value={{ userDetails, signout, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
