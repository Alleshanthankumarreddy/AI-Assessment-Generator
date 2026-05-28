const buildQuestionPaperPrompt = (
  assignment
) => {

  let prompt = `
Generate a structured question paper.

Subject: ${assignment.subject}

Title: ${assignment.title}

Instructions:
${assignment.instructions}

Content:
${assignment.content}

`;

  assignment.questionConfigurations.forEach(
    (config) => {

      prompt += `
Generate:
- ${config.numberOfQuestions} ${config.type} questions
- Difficulty: ${config.difficulty}
- Marks per question: ${config.marksPerQuestion}
`;

    }
  );

  prompt += `
Return ONLY valid JSON in this format:

{
  "sections": [
    {
      "title": "",
      "instruction": "",
      "questions": [
        {
          "questionText": "",
          "difficulty": "",
          "marks": 0,
          "type": ""
        }
      ]
    }
  ]
}
`;

  return prompt;
};

export default buildQuestionPaperPrompt;