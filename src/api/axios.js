import axios from "axios";

const baseURL =
  import.meta.env.https://jobboard-backend-f6y8.onrender.com || "http://localhost:5000/api";

const API = axios.create({
  baseURL,
  // withCredentials: true, // agar cookies use kar rahe ho toh uncomment
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
