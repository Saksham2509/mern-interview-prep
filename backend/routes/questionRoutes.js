import express from 'express';
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
  updateExplanation, // 1. Import the new controller function
} from '../controllers/questionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Create questions (POST)
router.post('/add', protect, addQuestionsToSession);

// Update routes (PUT)
router.put('/:id/pin', protect, togglePinQuestion);
router.put('/:id/note', protect, updateQuestionNote);

// 2. Add the new route for saving the AI explanation
router.put('/:id/explanation', protect, updateExplanation);

export default router;