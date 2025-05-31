const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }, // YYYY-MM-DD format
  calories: { type: Number, default: 0 },
  steps: { type: Number, default: 0 },
  workout: { type: Boolean, default: false }
});

dailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);
