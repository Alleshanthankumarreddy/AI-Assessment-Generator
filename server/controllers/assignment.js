import Assignment from "../models/AssignmentModel.js";

import questionPaperQueue from "../queues/questionPaperQueue.js";

import GeneratedPaper from "../models/GeneratedPaper.js";


// ======================================================
// CREATE ASSIGNMENT
// ======================================================

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
      TeacherId,
    } = req.body;

    let questionConfigurations =
      req.body.questionConfigurations;

    // ================= PARSE QUESTION CONFIGS =================

    if (
      typeof questionConfigurations === "string"
    ) {

      questionConfigurations =
        JSON.parse(questionConfigurations);

    }

    const uploadedFile =
      req.file
        ? req.file.path
        : "";

    // ================= VALIDATIONS =================

    // ================= VALIDATIONS =================

const missingFields = [];

if (!title) {
  missingFields.push("title");
}

if (!subject) {
  missingFields.push("subject");
}

if (!dueDate) {
  missingFields.push("dueDate");
}

if (!content) {
  missingFields.push("content");
}

if (!TeacherId) {
  missingFields.push("TeacherId");
}

if (missingFields.length > 0) {

  console.log(
    "Missing Fields:",
    missingFields
  );

  return res.status(400).json({

    success: false,

    message:
      "Missing required fields",

    missingFields,

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

        teacher: TeacherId,

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
      "question-paper-generation",
      {
        assignmentId:
          assignment._id,
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

      message:
        error.message,

    });

  }

};


// ======================================================
// GET ALL ASSIGNMENTS
// ======================================================

const getAllAssignments = async (
  req,
  res
) => {

  try {

    const { TeacherId } =
      req.query;
  
    const assignments =
      await Assignment.find({

        teacher: TeacherId,

      })
        .select(
          "title subject dueDate status createdAt"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      assignments,

    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}
};


// ======================================================
// GET SINGLE ASSIGNMENT
// ======================================================

const getSingleAssignment = async (
  req,
  res
) => {

  try {

    const { TeacherId } =
      req.query;

    const { id } =
      req.params;

    const assignment =
      await Assignment.findOne({

        _id: id,

        teacher: TeacherId,

      }).populate(
        "generatedPaper"
      );

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

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};


// ======================================================
// DELETE ASSIGNMENT
// ======================================================

const deleteAssignment = async (
  req,
  res
) => {

  try {

    const { TeacherId } =
      req.body;

    const { id } =
      req.params;

    const assignment =
      await Assignment.findOne({

        _id: id,

        teacher: TeacherId,

      });

    if (!assignment) {

      return res.status(404).json({

        success: false,

        message:
          "Assignment not found",

      });

    }

    // ================= DELETE GENERATED PAPER =================

    if (
      assignment.generatedPaper
    ) {

      await GeneratedPaper.findByIdAndDelete(
        assignment.generatedPaper
      );

    }

    // ================= DELETE ASSIGNMENT =================

    await Assignment.findByIdAndDelete(
      id
    );

    res.status(200).json({

      success: true,

      message:
        "Assignment deleted successfully",

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


// ======================================================
// GET QUESTION PAPER
// ======================================================

const getQuestionPaper = async (
  req,
  res
) => {

  try {

    const { TeacherId } =
      req.query;

    const { id } =
      req.params;

    const assignment =
      await Assignment.findOne({

        _id: id,

        teacher: TeacherId,

      })
        .populate(
          "generatedPaper"
        )
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


export {

  createAssignment,

  getAllAssignments,

  getSingleAssignment,

  deleteAssignment,

  getQuestionPaper,

};