import { Worker } from "bullmq";
import {getIO} from "../socket.js";

import redisConnection from "../config/redis.js";

import Assignment from "../models/AssignmentModel.js";

import GeneratedPaper from "../models/GeneratedPaper.js";

import buildQuestionPaperPrompt from "../services/prompt.js";

import generateQuestionPaper from "../services/ai.js";

const worker = new Worker(
  "question-paper-generation",

  async (job) => {

    console.log("=================================");
    console.log("Job received:", job.id);
    console.log("Assignment ID:", job.data.assignmentId);
    console.log("=================================");

    console.time("Total Job");

    let assignment;

    try {

      const { assignmentId } = job.data;

      // ================= FIND ASSIGNMENT =================
      console.time("Find Assignment");

      assignment = await Assignment.findById(
        assignmentId
      ).populate(
        "teacher",
        "institution name"
      );

      console.timeEnd("Find Assignment");

      if (!assignment) {
        throw new Error(
          "Assignment not found"
        );
      }

      // ================= UPDATE STATUS =================
      console.time("Update Processing Status");

      assignment.status = "processing";
      await assignment.save();

      console.timeEnd(
        "Update Processing Status"
      );

      // ================= SOCKET =================
      console.time("Socket Processing Emit");

      getIO().emit(
        "assignment-status",
        {
          assignmentId:
            assignment._id.toString(),
          status: "processing",
        }
      );

      console.timeEnd(
        "Socket Processing Emit"
      );

      // ================= PROMPT BUILD =================
      console.time("Prompt Build");

      const prompt =
        buildQuestionPaperPrompt(
          assignment
        );

      console.timeEnd(
        "Prompt Build"
      );

      console.log(
        "Prompt Length:",
        prompt.length
      );

      // ================= GEMINI =================
      console.time("Gemini Generation");

      const aiResponse =
        await generateQuestionPaper(
          prompt,
          assignment.uploadedFile
        );

      console.timeEnd(
        "Gemini Generation"
      );

      console.log(
        "AI Response Length:",
        aiResponse?.length
      );

      // ================= CLEAN =================
      console.time("Response Clean");

      const cleanedResponse =
        aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      console.timeEnd(
        "Response Clean"
      );

      // ================= JSON PARSE =================
      console.time("JSON Parse");

      const parsedResponse =
        JSON.parse(
          cleanedResponse
        );

      console.timeEnd(
        "JSON Parse"
      );

      console.log(
        "Sections Generated:",
        parsedResponse.sections?.length
      );

      // ================= SAVE PAPER =================
      console.time("Save Generated Paper");

      const generatedPaper =
        await GeneratedPaper.create({

          assignment:
            assignment._id,

          sections:
            parsedResponse.sections,

        });

      console.timeEnd(
        "Save Generated Paper"
      );

      // ================= UPDATE ASSIGNMENT =================
      console.time(
        "Update Assignment Complete"
      );

      assignment.generatedPaper =
        generatedPaper._id;

      assignment.status =
        "completed";

      await assignment.save();

      console.timeEnd(
        "Update Assignment Complete"
      );

      // ================= SOCKET COMPLETE =================
      console.time(
        "Socket Completed Emit"
      );

      getIO().emit(
        "assignment-status",
        {
          assignmentId:
            assignment._id.toString(),

          status:
            "completed",

          generatedPaper: {
            _id:
              generatedPaper._id,

            sections:
              generatedPaper.sections,

            generatedByAI:
              generatedPaper.generatedByAI,
          },

          institution:
            assignment.teacher
              ?.institution ||
            "VedaAI Assessment System",
        }
      );

      console.timeEnd(
        "Socket Completed Emit"
      );

      console.timeEnd(
        "Total Job"
      );

      console.log(
        "Job Completed Successfully"
      );

    } catch (error) {

      console.error(
        "Worker Error:",
        error
      );

      if (assignment) {

        assignment.status =
          "failed";

        await assignment.save();

        getIO().emit(
          "assignment-status",
          {
            assignmentId:
              assignment._id.toString(),
            status:
              "failed",
          }
        );
      }

      console.timeEnd(
        "Total Job"
      );
    }
  },

  {
    connection:
      redisConnection,
  }
);

export default worker;