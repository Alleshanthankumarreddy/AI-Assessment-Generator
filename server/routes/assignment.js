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
  upload.single("uploadedFile"),
  createAssignment
);

assignmentRoutes.get(
  "/",
  getAllAssignments
);


// GET SINGLE
assignmentRoutes.get(
  "/:id",
  getSingleAssignment
);


// DELETE
assignmentRoutes.delete(
  "/:id",
  deleteAssignment
);


assignmentRoutes.get(
  "/question-paper/:id",
  getQuestionPaper
);

export default assignmentRoutes;