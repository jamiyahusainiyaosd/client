import axios from "axios";
import { baseUrl } from "../constants/env.constants";

const LIVE_BACKEND_URL = "https://jamiyahusainiya-backend.vercel.app/api/v1";

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Automatic fallback: if local 127.0.0.1 is not reachable, retry with live Vercel backend
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest &&
      !originalRequest._retry &&
      (error.code === "ERR_NETWORK" ||
        error.message?.includes("Network Error") ||
        error.message?.includes("ERR_CONNECTION_REFUSED"))
    ) {
      originalRequest._retry = true;
      originalRequest.baseURL = LIVE_BACKEND_URL;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;