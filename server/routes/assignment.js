import express from "express";

import isAuthenticated from "../middleware/authMiddelware.js";
import upload from "../middleware/upload.js";

import {
  createAssignment,
  getAllAssignments,
  getSingleAssignment,
  deleteAssignment,
  getQuestionPaper,
} from "../controllers/assignment.js";

const assignmentRoutes = express.Router();

assignmentRoutes.post(
  "/create",
  isAuthenticated,
  upload.single("uploadedFile"),
  createAssignment
);

assignmentRoutes.get(
  "/",
  isAuthenticated,
  getAllAssignments
);


// GET SINGLE
assignmentRoutes.get(
  "/:id",
  isAuthenticated,
  getSingleAssignment
);


// DELETE
assignmentRoutes.delete(
  "/:id",
  isAuthenticated,
  deleteAssignment
);


assignmentRoutes.get(
  "/question-paper/:id",
  isAuthenticated,
  getQuestionPaper
);

export default assignmentRoutes;