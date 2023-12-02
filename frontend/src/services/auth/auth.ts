import { api } from "../config/axiosConfigs";

const authUrl = "/auth/";

export const AuthService = {
  signup: async (signUpData: any) => {
    const response = await api.request({
      method: "POST",
      url: authUrl + "signup",
      data: signUpData,
    });

    return { token: response.data.token };
  },

  signin: async (signInData: any) => {
    const response = await api.request({
      method: "POST",
      url: authUrl + "signin",
      data: signInData,
    });

    return { token: response.data.token };
  },

  signout: async () => {
    const response = await api.request({
      method: "POST",
      url: authUrl + "signout",
      withCredentials: true,
    });

    return { message: response.data.message };
  },

  googleAuth: async (googleAuthData: any, signUp: boolean) => {
    const response = await api.request({
      method: "POST",
      url: authUrl + "google",
      data: googleAuthData,
      params: { signUp },
    });

    return { token: response.data.token };
  },

  checkEmail: async (email: string) => {
    const response = await api.request({
      method: "POST",
      url: authUrl + "checkEmail",
      data: { email },
    });

    return { emailExists: response.data.emailExists };
  },

  refreshToken: async () => {
    const response = await api.request({
      method: "GET",
      url: authUrl + "refresh",
    });

    return { token: response.data.token };
  },
};
