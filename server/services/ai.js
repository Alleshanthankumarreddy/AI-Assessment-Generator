import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

import mime from "mime-types";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });


// FILE TO GEMINI FORMAT
const fileToGenerativePart = (
  path,
  mimeType
) => {

  return {

    inlineData: {

      data:
        fs.readFileSync(path)
          .toString("base64"),

      mimeType,

    },

  };

};


const generateQuestionPaper = async (
  prompt,
  uploadedFile
) => {

  try {

    let result;

    // ================= WITH FILE =================

    if (uploadedFile) {

      const mimeType =
  mime.lookup(uploadedFile);

      const filePart =
        fileToGenerativePart(
          uploadedFile,
          mimeType
        );

      result =
        await model.generateContent([
          prompt,
          filePart,
        ]);

    }

    // ================= TEXT ONLY =================

    else {

      result =
        await model.generateContent(
          prompt
        );

    }

    let response =
      result.response.text();

    // CLEAN RESPONSE
    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return response;

  } catch (error) {

    console.log(
      "Gemini Error:",
      error
    );

    throw error;

  }

};

export default generateQuestionPaper;