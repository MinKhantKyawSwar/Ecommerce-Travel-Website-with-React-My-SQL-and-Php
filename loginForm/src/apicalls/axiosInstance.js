import axios from "axios";

const getFreshLocalStorage = () => {
  const refreshToken = localStorage.getItem("token");
  return refreshToken;
};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/backend/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFreshLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
