import Question from '../models/Question.js';
import Session from '../models/Session.js';

// ➕ Add a question to a session
export const addQuestion = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const session = await Session.findOne({ _id: sessionId, user: req.user._id });

    if (!session) {
      return res.status(404).json({ message: 'Session not found or not authorized' });
    }

    const newQuestion = await Question.create({
      session: sessionId,
      question,
      answer,
    });

    // Optional: add question to session's array
    session.questions.push(newQuestion._id);
    await session.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📌 Pin/unpin question
export const togglePinQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.json({ message: `Question ${question.isPinned ? 'pinned' : 'unpinned'}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
