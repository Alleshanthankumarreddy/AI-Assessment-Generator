import mongoose from "mongoose";

const questionConfigSchema = new mongoose.Schema({
  
  type: {
    type: String,
    enum: ["MCQ", "Descriptive", "True/False", "Fill in the Blanks", "Match the Following", "Short Answer", "Long Answer"],
    required: true,
  },

  numberOfQuestions: {
    type: Number,
    required: true,
    min: 1,
  },

  marksPerQuestion: {
    type: Number,
    required: true,
    min: 1,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});


const assignmentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    // NEW STRUCTURE
    questionConfigurations: [questionConfigSchema],

    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    instructions: {
      type: String,
      default: "",
    },

    uploadedFile: {
      type: String,
      default: "",
    },

    generatedPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedPaper",
    },

    status: {
      type: String,
      enum: [
        "processing",
        "completed",
        "failed",
      ],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model(
  "Assignment",
  assignmentSchema
);

export default Assignment;