import Assignment from "../models/AssignmentModel.js";

import questionPaperQueue from "../queues/questionPaperQueue.js";
import GeneratedPaper from "../models/GeneratedPaper.js";

const createAssignment = async (
  req,
  res
) => {

  try {

    const {
      title,
      subject,
      dueDate,
      instructions,
      content,
    } = req.body;

    let questionConfigurations =
      req.body.questionConfigurations;

    if (
      typeof questionConfigurations === "string"
    ) {

      questionConfigurations =
        JSON.parse(questionConfigurations);

    }


  const uploadedFile = req.file
    ? req.file.path
    : "";

    // ================= VALIDATIONS =================

    if (
      !title ||
      !subject ||
      !dueDate ||
      !content
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });

    }


    if (
      !Array.isArray(
        questionConfigurations
      ) ||
      questionConfigurations.length === 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          "At least one question configuration is required",
      });

    }


    // ================= VALIDATE QUESTION CONFIGS =================

    for (const config of questionConfigurations) {

      if (
        !config.type ||
        !config.numberOfQuestions ||
        !config.marksPerQuestion
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid question configuration",
        });

      }


      if (
        config.numberOfQuestions <= 0 ||
        config.marksPerQuestion <= 0
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Questions and marks must be greater than 0",
        });

      }

    }


    // ================= CALCULATE TOTALS =================

    let totalQuestions = 0;

    let totalMarks = 0;


    questionConfigurations.forEach(
      (config) => {

        totalQuestions +=
          config.numberOfQuestions;

        totalMarks +=
          config.numberOfQuestions *
          config.marksPerQuestion;

      }
    );


    // ================= CREATE ASSIGNMENT =================

    const assignment =
      await Assignment.create({

        teacher: req.teacher._id,

        title,

        subject,

        dueDate,

        questionConfigurations,

        totalQuestions,

        totalMarks,

        instructions:
          instructions || "",

        content,

        uploadedFile:
          uploadedFile || "",

      });


    // ================= ADD JOB TO QUEUE =================

    await questionPaperQueue.add(
      "generate-paper",
      {
        assignmentId: assignment._id,
      }
    );


    // ================= RESPONSE =================

    res.status(201).json({

      success: true,

      message:
        "Assignment submitted for generation",

      assignment,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getAllAssignments = async (
  req,
  res
) => {

  try {

    const assignments =
      await Assignment.find({
        teacher: req.teacher._id,
      })
      .select(
        "title subject dueDate status createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      assignments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getSingleAssignment = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const assignment =
      await Assignment.findOne({
        _id: id,
        teacher: req.teacher._id,
      }).populate("generatedPaper");

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message:
          "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      assignment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteAssignment = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const assignment =
      await Assignment.findOne({
        _id: id,
        teacher: req.teacher._id,
      });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message:
          "Assignment not found",
      });
    }

    // Delete generated paper
    if (assignment.generatedPaper) {

      await GeneratedPaper.findByIdAndDelete(
        assignment.generatedPaper
      );

    }

    // Delete assignment
    await Assignment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message:
        "Assignment deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getQuestionPaper = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const assignment =
      await Assignment.findOne({

        _id: id,

        teacher:
          req.teacher._id,

      })
      .populate("generatedPaper")
      .populate(
        "teacher",
        "institution name"
      );

    if (!assignment) {

      return res.status(404).json({

        success: false,

        message:
          "Assignment not found",

      });

    }

    if (
      !assignment.generatedPaper
    ) {

      return res.status(404).json({

        success: false,

        message:
          "Question paper not generated yet",

      });

    }

    res.status(200).json({

      success: true,

      assignment: {

        _id:
          assignment._id,

        title:
          assignment.title,

        subject:
          assignment.subject,

        dueDate:
          assignment.dueDate,

        status:
          assignment.status,

        institution:
          assignment.teacher
            ?.institution,

      },

      generatedPaper:
        assignment.generatedPaper,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};


export { createAssignment, getAllAssignments, getSingleAssignment, deleteAssignment, getQuestionPaper };