import axios, { AxiosError } from "axios";

export const createAPI = () => {
  const api = axios.create({
    withCredentials: true,
    baseURL: "/api",
  });

  // Registering the custom error handler to the
  // "api" axios instance
  api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
  });

  return api;
};

// Defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // Logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }
};

export const api = createAPI();