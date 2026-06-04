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

      const { assignmentId } =
        job.data;


      // FIND
      assignment =
        await Assignment.findById(
          assignmentId
        ).populate( "teacher", "institution name" );


      if (!assignment) {

        throw new Error(
          "Assignment not found"
        );

      }


      // PROCESSING
      assignment.status =
        "processing";

      await assignment.save();


      // SOCKET EMIT
      getIO().emit(
        "assignment-status",
        {

          assignmentId:
            assignment._id.toString(),

          status:
            "processing",

        }
      );


     console.time("Total Job");

      console.time("Prompt Build");
      const prompt = buildQuestionPaperPrompt(assignment);
      console.timeEnd("Prompt Build");

      console.time("Gemini");
      const aiResponse =
        await generateQuestionPaper(
          prompt,
          assignment.uploadedFile
        );
      console.timeEnd("Gemini");

      console.time("JSON Parse");
      const parsedResponse =
        JSON.parse(cleanedResponse);
      console.timeEnd("JSON Parse");

      console.time("DB Save");
      const generatedPaper =
        await GeneratedPaper.create({
          assignment: assignment._id,
          sections: parsedResponse.sections,
        });
      console.timeEnd("DB Save");

      console.timeEnd("Total Job");
      // COMPLETE
      assignment.generatedPaper =
        generatedPaper._id;

      assignment.status =
        "completed";

      await assignment.save();


      // SOCKET COMPLETE
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


    } catch (error) {

      console.log(error);


      // FAILED
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