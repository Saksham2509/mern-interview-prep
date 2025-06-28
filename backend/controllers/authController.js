import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 👉 SIGN UP
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate JWT token
    const token = jwt.sign({ id: newUser._id }, 'secretKey', {
      expiresIn: '7d',
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// 👉 LOGIN (for now just placeholder)
export const loginUser = (req, res) => {
  res.send("Login route hit ✅");
};

// 👉 GET PROFILE (for now just placeholder)
export const getMe = (req, res) => {
  res.send("Profile info route hit ✅");
};
