import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-assessment-generator-iosd.onrender.com/api",
  withCredentials: true,
});

export default api;
