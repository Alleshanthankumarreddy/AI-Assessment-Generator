import axios from "axios";

const api = axios.create({

  baseURL:
    "https://ai-assessment-generator-delta.vercel.app/api",

  withCredentials: true,

});

export default api;
