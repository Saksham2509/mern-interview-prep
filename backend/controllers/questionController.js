import Question from "../models/Question.js";
import Session from "../models/Session.js";

// ➕ Add one or more questions to a session
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findOne({ _id: sessionId, user: req.user.id });
    if (!session) {
      return res.status(404).json({ message: "Session not found or unauthorized" });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
        note: "", // Default empty note
        isPinned: false, // Default unpinned
      }))
    );

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error("AddQuestions Error:", error.message);
    res.status(500).json({ message: "Server error while adding questions" });
  }
};

// 📌 Pin or unpin a question
export const togglePinQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({
      message: `Question ${question.isPinned ? "pinned" : "unpinned"}`,
      question,
    });
  } catch (error) {
    console.error("TogglePin Error:", error.message);
    res.status(500).json({ message: "Server error while toggling pin" });
  }
};


// Add this new function into server/controllers/questionController.js

export const updateExplanation = async (req, res) => {
  try {
    const { id } = req.params; // Using 'id' to match your route parameter
    const { explanation } = req.body;

    if (typeof explanation !== "string") {
      return res.status(400).json({ message: "Explanation must be a string" });
    }

    // Find the question by its ID
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Check if the user making the request owns the session
    // This is an important security check
    const session = await Session.findById(question.session);
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Update and save the explanation
    question.explanation = explanation;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("UpdateExplanation Error:", error.message);
    res.status(500).json({ message: "Server error while updating explanation" });
  }
};

// 📝 Update note for a question
export const updateQuestionNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (typeof note !== "string") {
      return res.status(400).json({ message: "Note must be a string" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.note = note.trim();
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("UpdateNote Error:", error.message);
    res.status(500).json({ message: "Server error while updating note" });
  }
};
