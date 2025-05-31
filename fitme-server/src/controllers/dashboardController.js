const DailyLog = require('../models/dailyLog');
const User = require('../models/user');

// Utility: Age calculator
function calculateAge(dob) {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getActivityMultiplier(activity) {
  switch (activity) {
    case 'sedentary': return 1.2;
    case 'light': return 1.375;
    case 'moderate': return 1.55;
    case 'very': return 1.725;
    case 'super': return 1.9;
    default: return 1.2;
  }
}

function calculateMaintenanceCalories({ gender, dob, weight, height, activity }) {
  const age = calculateAge(dob);
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return Math.round(bmr * getActivityMultiplier(activity));
}

// GET /api/users/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const maintenance = calculateMaintenanceCalories(user);

    // Get all logs for the year for heatmap (or adjust as you wish)
    const year = new Date().getFullYear();
    const jan1 = new Date(year, 0, 1);
    const dec31 = new Date(year, 11, 31);

    const logs = await DailyLog.find({
      user: user._id,
      date: {
        $gte: jan1,
        $lte: dec31
      }
    });

    // Format logs to always return date as YYYY-MM-DD string
    const formattedLogs = logs.map(log => ({
      ...log.toObject(),
      date: log.date.toISOString().slice(0, 10),
    }));

    res.json({ maintenance, logs: formattedLogs });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/users/log
exports.upsertDailyLog = async (req, res) => {
  try {
    const { date, calories, steps, workout } = req.body;
    const userId = req.user.userId;

    // Normalize date to YYYY-MM-DD and store as Date object
    const isoDate = new Date(date);
    const normalizedDate = new Date(isoDate.toISOString().slice(0, 10)); // 00:00 UTC

    const log = await DailyLog.findOneAndUpdate(
      { user: userId, date: normalizedDate },
      { calories, steps, workout, user: userId, date: normalizedDate },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Return log with date as YYYY-MM-DD string
    const formattedLog = {
      ...log.toObject(),
      date: log.date.toISOString().slice(0, 10),
    };

    res.json({ log: formattedLog });
  } catch (err) {
    console.error('Log error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
