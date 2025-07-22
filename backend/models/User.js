// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   mobile: { type: String },
//   profilePicture: { 
//     type: String,
//     get: (value) => {
//       // Return full URL for profile pictures
//       return value ? `${process.env.BASE_URL || 'http://localhost:8082'}${value}` : null;
//     }
//   },
//   balance: { type: Number, default: 0 },
//   currency: { type: String, default: '¥' },
//   cryptoBalance: { type: Number, default: 0 },
//   cryptoCurrency: { type: String, default: 'ETH' },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' }
// }, { 
//   timestamps: true,
//   toJSON: { getters: true } // Ensure getters are applied when converting to JSON
// });

// // Password hashing middleware
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Password comparison method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },
  profilePicture: { type: String },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: '¥' },
  cryptoBalance: { type: Number, default: 0 },
  cryptoCurrency: { type: String, default: 'ETH' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { 
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);