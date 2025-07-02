import express from 'express';
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} from '../controllers/questionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addQuestionsToSession);       // Add multiple questions
router.post('/:id/pin', protect, togglePinQuestion);        // Pin/unpin question
router.post('/:id/note', protect, updateQuestionNote);      // Add or update a note

export default router;
