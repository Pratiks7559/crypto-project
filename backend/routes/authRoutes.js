// // routes/authRoutes.js
// import express from "express";
// import multer from "multer";
// import path from "path";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { fileURLToPath } from "url";
// import User from "../models/User.js";

// const router = express.Router();
// const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk4NjIyNjAwLCJleHAiOjE2OTg2MjYyMDB9.jg6D8g8WvUJ7xBejLwBpBqvZ-C0xA_vc_vOKsdhDLyk"; // 👉 Use dotenv in production

// // ES6 __dirname workaround
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads/"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// /* ------------------------ SIGNUP ------------------------ */
// router.post("/signup", upload.single("profilePic"), async (req, res) => {
//   try {
//     const { fullName, email, password, mobile } = req.body;
//     const profilePic = req.file ? req.file.filename : null;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ fullName, email, password: hashedPassword, mobile, profilePic });
//     await newUser.save();

//     res.status(200).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* ------------------------ LOGIN ------------------------ */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     // 🔐 Create JWT token
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         mobile: user.mobile,
//         profilePic: user.profilePic
//       }
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';
// import Session from '../models/Session.js';

// const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk4NjIyNjAwLCJleHAiOjE2OTg2MjYyMDB9.jg6D8g8WvUJ7xBejLwBpBqvZ-C0xA_vc_vOKsdhDLyk" || "your-secret-key";

// // Correct upload directory path (relative to THIS file)
// const UPLOADS_DIR = path.join(__dirname, '../uploads/profile-pictures');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Ensure directory exists
//     fs.mkdirSync(UPLOADS_DIR, { recursive: true });
//     cb(null, UPLOADS_DIR);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, `profile-${uniqueSuffix}${ext}`);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

// // Register new user
// router.post('/signup', upload.single('profilePic'), async (req, res) => {
//   try {
//     const { fullName, email, password, mobile } = req.body;
    
//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already in use' });
//     }

//     // Create new user with correct relative path
//     const newUser = new User({
//       fullName,
//       email,
//       password,
//       mobile,
//       profilePicture: req.file 
//         ? `/uploads/profile-pictures/${req.file.filename}`
//         : null
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ 
//       message: 'Registration successful',
//       token,
//       user: {
//         _id: newUser._id,
//         fullName: newUser.fullName,
//         email: newUser.email,
//         mobile: newUser.mobile,
//         profilePicture: newUser.profilePicture
//       }
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ 
//       error: error.message,
//       details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// // Login user
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Check password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id,
//         email: user.email,
//         role: user.role || "user" 
//       }, 
//       JWT_SECRET, 
//       { expiresIn: "1h" }
//     );

//     // Create session
//     await new Session({
//       sessionId: token,
//       email: user.email,
//       ipAddress: req.ip,
//       userAgent: req.headers['user-agent']
//     }).save();

//     res.json({ 
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         role: user.role || "user",
//         profilePicture: user.profilePicture
//       }
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;

import express from 'express';
import { signup, login } from '../controller/authController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/signup', upload.single('profilePic'), signup);
router.post('/login', login);

export default router;