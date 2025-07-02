import express from 'express';
import { loginUser, signupUser, getMe } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ✅ Routes matching your controller function names
router.post('/register', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getMe);

// 🖼️ Optional: Profile image upload
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

export default router;
