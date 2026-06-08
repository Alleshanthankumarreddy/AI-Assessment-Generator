import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-assessment-generator-tav0.onrender.com/api",
  withCredentials: true,
});

export default api;
