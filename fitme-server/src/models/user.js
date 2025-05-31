const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  age:       { type: Number },
  dob:       { type: Date }, 
  gender:    { type: String },
  height:    { type: Number }, // in cm
  weight:    { type: Number }, // in kg
  goal:      { type: String }, // e.g., 'lose weight', 'gain muscle'
  activity: { type: String }, // e.g., 'sedentary', 'active'
  userImage: { type: String, default: '' }, // URL or path to profile image
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
