import express from 'express';
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} from '../controllers/questionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Create questions (POST)
router.post('/add', protect, addQuestionsToSession);

// Update routes (PUT)
router.put('/:id/pin', protect, togglePinQuestion);     // ✅ fix
router.put('/:id/note', protect, updateQuestionNote);   // ✅ fix

export default router;
