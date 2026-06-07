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

    let assignment;

    try {

      const { assignmentId } = job.data;


      assignment = await Assignment.findById(
        assignmentId
      ).populate(
        "teacher",
        "institution name"
      );


      if (!assignment) {
        throw new Error(
          "Assignment not found"
        );
      }


      assignment.status = "processing";
      await assignment.save();



      getIO().emit(
        "assignment-status",
        {
          assignmentId:
            assignment._id.toString(),
          status: "processing",
        }
      );



      const prompt =
        buildQuestionPaperPrompt(
          assignment
        );


      console.log(
        "Prompt Length:",
        prompt.length
      );


      const aiResponse =
        await generateQuestionPaper(
          prompt,
          assignment.uploadedFile
        );


      console.log(
        "AI Response Length:",
        aiResponse?.length
      );

      const cleanedResponse =
        aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      const parsedResponse =
        JSON.parse(
          cleanedResponse
        );

      console.log(
        "Sections Generated:",
        parsedResponse.sections?.length
      );

      const generatedPaper =
        await GeneratedPaper.create({

          assignment:
            assignment._id,

          sections:
            parsedResponse.sections,

        });


      assignment.generatedPaper =
        generatedPaper._id;

      assignment.status =
        "completed";

      await assignment.save();

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
    }
  },

  {
    connection:
      redisConnection,
  }
);

export default worker;