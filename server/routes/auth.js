import express from "express";

import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getCurrentTeacher
} from "../controllers/auth.js";
import isAuthenticated from "../middleware/authMiddelware.js";

const Authrouter = express.Router();

Authrouter.post("/register", registerTeacher);

Authrouter.post("/login", loginTeacher);

Authrouter.get("/logout", logoutTeacher);

Authrouter.get("/me", isAuthenticated, getCurrentTeacher);

export default Authrouter;