import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // For cookie-based auth
});

// Add a request interceptor to include the token in the header if it exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("workpal_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
