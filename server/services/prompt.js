const buildQuestionPaperPrompt = (
  assignment
) => {

  let prompt = `
You are an expert academic question paper generator.

Your task is to generate a high-quality, well-structured, and pedagogically sound question paper based ONLY on the provided subject content and instructions.

=====================
ASSIGNMENT DETAILS
=====================

Subject:
${assignment.subject}

Title:
${assignment.title}

Instructions:
${assignment.instructions}


=====================
QUESTION GENERATION RULES
=====================

1. Generate meaningful, academically rigorous, and clearly worded questions.

2. Questions must strictly follow:
   - The requested question type
   - The specified difficulty level
   - The exact marks allocation

3. Avoid:
   - Duplicate or redundant questions
   - Ambiguous, vague, or overly broad wording
   - Extremely short or incomplete questions
   - Repeated concepts across questions
   - Content outside the provided study material

4. Difficulty Guidelines:
   - Easy:
     • Direct theory
     • Definitions
     • Basic recall and simple understanding

   - Medium:
     • Conceptual understanding
     • Short applications
     • Comparisons and explanations

   - Hard:
     • Analytical reasoning
     • Problem-solving
     • Case-based scenarios
     • Deep conceptual integration

5. Questions must be directly relevant to the provided study material only.

6. If the study material is insufficient for some questions:
   - Still generate the best possible relevant questions using logical inference
   - Do NOT mention lack of content or insufficiency in the output

7. Use professional, formal exam language throughout.

8. Each section must contain:
   - A clear and appropriate section title
   - A concise section-specific instruction
   - Only questions belonging to that section's type and difficulty

9. Ensure variety in question phrasing while maintaining consistency in style and tone.

10. Ensure the total marks and number of questions exactly match the configuration.
`;
assignment.questionConfigurations.forEach(
  (config, index) => {

    prompt += `
=====================
SECTION ${index + 1}
=====================

Generate:
- Exactly ${config.numberOfQuestions} questions
- Question Type: ${config.type}
- Difficulty Level: ${config.difficulty}
- Marks Per Question: ${config.marksPerQuestion}

Additional Section Rules:
- All questions in this section must be of the specified type and difficulty.
- Do not mix question types or difficulty levels within this section.
- Ensure logical progression and variety among questions in this section.
`;

    // MCQ Rules
    if (config.type.toLowerCase() === "mcq") {

      prompt += `

MCQ SPECIFIC RULES

1. Every MCQ must have exactly FOUR options.

2. Store BOTH the question and the options inside the "questionText" field.

3. Separate the question and options using the delimiter:

<<<OPTIONS>>>

4. The format MUST be exactly:

Which language is object oriented?

<<<OPTIONS>>>

A. Java

B. HTML

C. CSS

D. XML

5. Do NOT create a separate "options" field.

6. Do NOT omit the delimiter.

7. Always provide four options labelled A, B, C and D.

8. Only one option should be correct.

9. Wrong options should be realistic and meaningful.

10. Never mention the correct answer in the output.

`;

    }

  }
);

  prompt += `
=====================
IMPORTANT OUTPUT RULES
=====================

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT use code fences like json.
4. Do NOT include explanations, comments, or extra text.
5. Do NOT include any text before or after the JSON object.
6. Ensure the JSON is syntactically correct and parseable.
7. Match the exact structure and field names in the required JSON format below.
8. If the question type is MCQ, the "questionText" field must contain BOTH the question and its four options.

9. Separate the question and options using the delimiter:

<<<OPTIONS>>>

10. Example:

"What is the capital of India?

<<<OPTIONS>>>

A. Hyderabad

B. Delhi

C. Mumbai

D. Chennai"

11. Do NOT create an "options" field.
=====================
REQUIRED JSON FORMAT
=====================

{
  "sections": [
    {
      "title": "Section Title",
      "instruction": "Section Instruction",
      "questions": [
        {
          "questionText": "Question here",
          "difficulty": "easy | medium | hard",
          "marks": 0,
          "type": "Question Type"
        }
      ]
    }
  ]
}
`;

  return prompt;
};

export default buildQuestionPaperPrompt;