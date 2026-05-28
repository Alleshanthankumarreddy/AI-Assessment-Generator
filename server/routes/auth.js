import express from "express";

import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
} from "../controllers/auth.js";
import isAuthenticated from "../middleware/authMiddelware.js";

const Authrouter = express.Router();

Authrouter.post("/register", registerTeacher);

Authrouter.post("/login", loginTeacher);

Authrouter.get("/logout", logoutTeacher);

export default Authrouter;