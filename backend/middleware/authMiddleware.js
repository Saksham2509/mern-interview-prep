import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 🔐 Middleware to protect routes using JWT
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn("❌ No token provided");
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token decoded:", decoded); // Show user ID and expiration

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      console.warn("❌ User not found from token");
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;

    console.log("🔐 Authenticated user attached:", req.user._id.toString());
    next();
  } catch (error) {
    console.error('❌ Auth Middleware Error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
export default protect;