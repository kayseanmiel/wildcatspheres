import axios from 'axios';

// 1. Create the instance with the CORRECT Port 8080
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Add the Token Interceptor (Logic from your deleted file, but cleaner)
api.interceptors.request.use(
  (config) => {
    // specific endpoints don't need tokens
    const publicEndpoints = ["/auth/login", "/auth/register"];
    const isPublic = publicEndpoints.some((endpoint) => config.url.includes(endpoint));

    if (!isPublic) {
      const token = localStorage.getItem("token"); // Check if you use "token" or "access"
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Add the Helper Function your app is missing (Crucial for fixing the crash!)
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token); // Standardize on "token"
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;