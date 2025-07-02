const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Utility to extract text from Gemini response
function getGeminiText(response) {
  if (
    response &&
    response.candidates &&
    response.candidates.length > 0 &&
    response.candidates[0].content &&
    response.candidates[0].content.parts &&
    response.candidates[0].content.parts.length > 0
  ) {
    return response.candidates[0].content.parts[0].text;
  }
  return null;
}

// Try parsing JSON, even if Gemini returns markdown-wrapped JSON
function tryParseJSON(text) {
  try {
    return { json: JSON.parse(text), error: null };
  } catch (err) {
    let cleaned = text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    try {
      return { json: JSON.parse(cleaned), error: null };
    } catch (err2) {
      return { json: null, error: err2.message };
    }
  }
}

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ text: prompt }],
    });

    const text = getGeminiText(response);
    if (!text) return res.status(500).json({ message: "No response from Gemini" });

    const { json, error } = tryParseJSON(text);
    if (json) res.status(200).json({ questions: json });
    else
      res.status(500).json({
        message: "Gemini did not return valid JSON",
        raw: text,
        error,
      });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generate explains a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ text: prompt }],
    });

    const text = getGeminiText(response);
    if (!text) return res.status(500).json({ message: "No response from Gemini" });

    const { json, error } = tryParseJSON(text);
    if (json) res.status(200).json({ explanation: json });
    else
      res.status(500).json({
        message: "Gemini did not return valid JSON",
        raw: text,
        error,
      });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
