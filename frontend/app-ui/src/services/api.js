import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Details:", {
      message: error.message,
      config: error.config,
      response: error.response,
    });
    return Promise.reject(error);
  },
);

export const fetchExamResultsByCode = async (examCode) => {
  const response = await api.get("/api/exam/results", {
    params: { examCode },
  });
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchExamResultsByUser = async (examCode, userId) => {
  const response = await api.get("/api/exam/results", {
    params: { examCode, userId },
  });
  return Array.isArray(response.data) ? response.data : [];
};

export const fetchExamInfo = async (examCode) => {
  const response = await api.get(`/api/exam/info/${examCode}`);
  return response.data;
};

export default api;
