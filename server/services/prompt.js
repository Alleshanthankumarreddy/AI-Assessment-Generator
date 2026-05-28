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

Study Material / Content:
${assignment.content}

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