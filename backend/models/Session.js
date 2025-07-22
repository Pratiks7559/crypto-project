// // models/Session.js
// import mongoose from "mongoose";

// const sessionSchema = new mongoose.Schema({
//   sessionId: { type: String, required: true },
//   email: { type: String, required: true, ref: "User" },
//   ipAddress: { type: String },
//   userAgent: { type: String },
//   timestamp: { type: Date, default: Date.now },
// });

// const Session = mongoose.model("Session", sessionSchema);
// export default Session;
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Session', sessionSchema);