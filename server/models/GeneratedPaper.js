import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: String,

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },

  marks: Number,
});

const sectionSchema = new mongoose.Schema({
  title: String,

  instruction: String,

  questions: [questionSchema],
});

const generatedPaperSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    sections: [sectionSchema],

    generatedByAI: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const GeneratedPaper = mongoose.model(
  "GeneratedPaper",
  generatedPaperSchema
);

export default GeneratedPaper;