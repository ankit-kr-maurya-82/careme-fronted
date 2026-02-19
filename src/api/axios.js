// src/api.js
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://careme-backend.vercel.app/api", // Backend base URL
  withCredentials: true, // send cookies automatically
});

const getStoredAccessToken = () => {
  const raw = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (!raw) return null;

  let token = raw;
  try {
    token = JSON.parse(raw);
  } catch {
    token = raw;
  }

  if (typeof token !== "string") return null;
  return token.replace(/^Bearer\s+/i, "").trim();
};

const clearAuthState = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
};

// Request interceptor: attach access token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for global error handling (e.g., token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || "";
      const isAuthEndpoint =
        requestUrl.includes("/login") || requestUrl.includes("/register");

      if (!isAuthEndpoint) {
        clearAuthState();
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }

      console.warn("Unauthorized! Session expired or token is invalid.");
    }
    return Promise.reject(error);
  }
);

export default api;
