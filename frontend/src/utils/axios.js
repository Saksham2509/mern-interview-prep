// utils/axiosInstance.js

import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000, // 80s timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 Request Interceptor - Adds Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response Interceptor - Handles common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Optional: clear token
        localStorage.removeItem("token");
        window.location.href = "/";
      } else if (status === 500) {
        console.error("🔥 Internal Server Error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("⏱️ Request timed out. Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
