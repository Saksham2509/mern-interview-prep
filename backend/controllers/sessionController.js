import Session from '../models/Session.js';
import Question from '../models/Question.js';
import { generateQuestionsFromAI } from './aiController.js';

// ➕ Create a new session and add linked questions
export const createSession = async (req, res) => {
  try {

    const { role, experience, topicsToFocus, description, questions } = req.body;

    if (!role || !experience) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // If questions is not provided, attempt to auto-generate a default set (10)
    let questionsArray = Array.isArray(questions) ? questions : [];
    let aiWarning = null;
    if (questionsArray.length === 0) {
      try {
        const generated = await generateQuestionsFromAI(role, experience, topicsToFocus || [], 10);
        // generated expected to be array of { question, answer }
        if (Array.isArray(generated) && generated.length > 0) {
          questionsArray = generated;
        }
      } catch (err) {
        console.warn('AI generation failed when creating session:', err.message);
        aiWarning = 'Failed to auto-generate initial questions';
        // proceed with empty questionsArray
      }
    }


    console.log("🛠️ Saving session with data:", {
      user: req.user.id,
      role,
      experience,
      topicsToFocus,
      description,
      questions: questionsArray
    });


    const session = await Session.create({
      user: req.user.id,
      role,
      experience,
      topicsToFocus,
      description,
    });

    let createdQuestions = [];
    if (questionsArray.length > 0) {
      createdQuestions = await Promise.all(
        questionsArray.map(async (q) => {
          const created = await Question.create({
            session: session._id,
            question: q.question,
            answer: q.answer,
          });
          return created._id;
        })
      );
      session.questions = createdQuestions;
      await session.save();
    }

    const payload = { success: true, session };
    if (aiWarning) payload.warning = aiWarning;
    res.status(201).json(payload);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 📄 Get all sessions for the logged-in user
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('questions');

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 🔍 Get a single session with its questions
export const getSessionById = async (req, res) => {
  try {
    console.log("🛠️ Fetching session for ID:", req.params.id);
    console.log("🔐 Authenticated user ID:", req.user.id);

    const session = await Session.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate({
      path: 'questions',
      options: { sort: { isPinned: -1, createdAt: 1 } },
    });

    if (!session) {
      console.warn("⚠️ No session found for this user and ID.");
      return res.status(404).json({ message: 'Session not found' });
    }

    console.log("✅ Found session:", session);
    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("🔥 Server error in getSessionById:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// ❌ Delete a session and its associated questions
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Verify session ownership
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete related questions first
    await Question.deleteMany({ session: session._id });

    // Then delete session itself
    await session.deleteOne();

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
