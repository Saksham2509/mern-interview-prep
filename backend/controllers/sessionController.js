import Session from '../models/Session.js';

// @desc    Create new session
// @route   POST /api/sessions
// @access  Private
export const createSession = async (req, res) => {
  try {
    const { role, experience } = req.body;

    if (!role || !experience) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const session = await Session.create({
      user: req.user._id,
      role,
      experience,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
