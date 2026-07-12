import express from "express";

import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getCurrentTeacher
} from "../controllers/auth.js";
import isAuthenticated from "../middleware/authMiddelware.js";
import { authLimiter } from "../middleware/rateLimiter.js";


const Authrouter = express.Router();

Authrouter.post("/register",authLimiter, registerTeacher);

Authrouter.post("/login", authLimiter, loginTeacher);

Authrouter.get("/logout", logoutTeacher);

Authrouter.get("/me", isAuthenticated, getCurrentTeacher);

export default Authrouter;