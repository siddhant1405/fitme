import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import defaultProfileImg from '../assets/images/image.jpg';
import { FaUserCircle, FaShoePrints, FaUtensils, FaDumbbell, FaRunning } from 'react-icons/fa';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Pie } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';
import 'react-calendar-heatmap/dist/styles.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Date-aware streak calculation
function getCurrentStreak(values) {
  // values: array of { date: "YYYY-MM-DD", count: number }
  // Sort by date ascending
  const sorted = [...values]
    .filter(v => v && v.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  let streak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = sorted.length - 1; i >= 0; i--) {
    const log = sorted[i];
    if (log.count > 0) {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);
      if (logDate.getTime() === today.getTime()) {
        streak++;
        today.setDate(today.getDate() - 1); // Move to previous day
      } else {
        // Not consecutive, streak breaks
        break;
      }
    } else {
      // Goal not met, streak breaks
      break;
    }
  }
  return streak;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // User/profile state
  const [profileImg, setProfileImg] = useState(defaultProfileImg);
  const [userName, setUserName] = useState('');
  const [userGoal, setUserGoal] = useState('lose');

  // Dashboard/log state
  const [maintenanceCalories, setMaintenanceCalories] = useState(0);
  const [heatmapData, setHeatmapData] = useState([]);
  const [logs, setLogs] = useState([]);

  // Log form state
  const [logDate, setLogDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [todaySteps, setTodaySteps] = useState(0);
  const [todayCalories, setTodayCalories] = useState(0);
  const [didWorkout, setDidWorkout] = useState(false);

  const stepGoal = 10000;
  const token = localStorage.getItem('token');
  const year = new Date().getFullYear();
  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);

  // Fetch dashboard and profile data on mount and after log save
  const fetchDashboard = async () => {
    try {
      // Fetch dashboard data
      const dashRes = await fetch('/api/users/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dashData = await dashRes.json();
      if (dashRes.ok) {
        setMaintenanceCalories(dashData.maintenance);
        setLogs(dashData.logs);

        setHeatmapData(
          dashData.logs.map(log => ({
            date: log.date,
            steps: log.steps,
            calories: log.calories,
            workout: log.workout,
          }))
        );
      } else {
        toast.error(dashData.message || 'Failed to load dashboard');
      }

      // Fetch user profile for name, image, and goal
      const profileRes = await fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      if (profileRes.ok) {
        setUserName(profileData.firstName);
        setProfileImg(profileData.userImage || defaultProfileImg);
        setUserGoal(profileData.goal || 'lose');
      }
    } catch (err) {
      toast.error('Failed to load dashboard');
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line
  }, [token]);

  // When logDate or logs change, update the form fields
  useEffect(() => {
    const log = logs.find(l => l.date === logDate);
    if (log) {
      setTodaySteps(log.steps);
      setTodayCalories(log.calories);
      setDidWorkout(log.workout);
    } else {
      setTodaySteps(0);
      setTodayCalories(0);
      setDidWorkout(false);
    }
  }, [logDate, logs]);

  // Progress/heatmap logic
  const progressValues = heatmapData.map(({ date, steps, calories, workout }) => {
    let score = 0;
    if (steps >= stepGoal) score++;
    if (
      (userGoal === 'lose' && calories < maintenanceCalories) ||
      ((userGoal === 'gain' || userGoal === 'muscle') && calories > maintenanceCalories)
    ) score++;
    if (workout) score++;
    return { date, count: score };
  });

  const streak = getCurrentStreak(progressValues);

  // Pie chart calculations
  const stepsMet = logs.filter(log => log.steps >= stepGoal).length;
  const stepsNotMet = logs.length - stepsMet;

  const caloriesMet = logs.filter(log =>
    (userGoal === 'lose' && log.calories < maintenanceCalories) ||
    ((userGoal === 'gain' || userGoal === 'muscle') && log.calories > maintenanceCalories)
  ).length;
  const caloriesNotMet = logs.length - caloriesMet;

  const workoutMet = logs.filter(log => log.workout).length;
  const workoutNotMet = logs.length - workoutMet;

  const stepsPieData = {
    labels: ['Met', 'Not Met'],
    datasets: [{
      data: [stepsMet, stepsNotMet],
      backgroundColor: ['#3A86FF', '#1f1f1f'],
      borderWidth: 1,
    }],
  };

  const caloriesPieData = {
    labels: ['Met', 'Not Met'],
    datasets: [{
      data: [caloriesMet, caloriesNotMet],
      backgroundColor: ['#FFB703', '#1f1f1f'],
      borderWidth: 1,
    }],
  };

  const workoutPieData = {
    labels: ['Met', 'Not Met'],
    datasets: [{
      data: [workoutMet, workoutNotMet],
      backgroundColor: ['#30a14e', '#1f1f1f'],
      borderWidth: 1,
    }],
  };

  // Save log for selected date
  const saveDailyLog = async () => {
    try {
      const res = await fetch('/api/users/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: logDate,
          calories: todayCalories,
          steps: todaySteps,
          workout: didWorkout,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Log saved successfully!');
        // Always re-fetch dashboard data for accuracy
        await fetchDashboard();
      } else {
        toast.error(data.message || 'Failed to save log');
      }
    } catch (err) {
      toast.error('Failed to save log');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header>
        {/* ProfileDropdown inline */}
        <div className="relative group">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 px-8 py-3 rounded-full hover:transition"
          >
            <FaUserCircle className="text-4xl text-white" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-zinc-900 rounded-lg shadow-lg py-2 z-50 border border-zinc-700">
              <a href="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-white hover:bg-zinc-800 transition">Profile</a>
              <div className="border-t border-zinc-700 my-1" />
              <a href="/about" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-white hover:bg-zinc-800 transition">About</a>
              <div className="border-t border-zinc-700 my-1" />
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-800 transition">Logout</button>
            </div>
          )}
        </div>
      </Header>

      <main className="flex-grow px-4 py-8 flex flex-col items-center">

        <div className="w-full max-w-5xl flex flex-col items-center justify-center mb-6">
          <img
            src={profileImg}
            alt="Profile"
            className="mb-4 w-24 h-24 rounded-full object-cover border-4 border-zinc-700 shadow-lg"
            style={{ minWidth: 96, minHeight: 96 }}
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-center">Hey {userName}!</h1>
          <div className="uppercase text-xs text-gray-500 tracking-wide font-semibold text-center">
            Ready to crush your goals today?
          </div>
        </div>

        <div className="flex gap-8 mt-6 mb-6 text-lg font-bold">
          <button
            className={`border-b-2 ${activeTab === 'dashboard' ? 'border-white text-white' : 'border-transparent text-gray-400'} px-2`}
            onClick={() => setActiveTab('dashboard')}
          >
            DASHBOARD
          </button>
          <button
            className={`border-b-2 ${activeTab === 'log' ? 'border-white text-white' : 'border-transparent text-gray-400'} px-2`}
            onClick={() => setActiveTab('log')}
          >
            DAILY LOG
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="w-full max-w-4xl bg-zinc-900 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Progress Grid</h2>
              <div className="bg-black rounded-lg p-4 overflow-x-auto">
                <CalendarHeatmap
                  startDate={jan1}
                  endDate={dec31}
                  values={progressValues}
                  showMonthLabels
                  showWeekdayLabels
                  classForValue={value =>
                      !value ? 'color-empty'
                      : value.count === 3 ? 'color-github-3'
                      : value.count === 2 ? 'color-github-2'
                      : value.count === 1 ? 'color-github-1'
                      : 'color-empty'
                    }
                  tooltipDataAttrs={value =>
                    value && value.date
                      ? { 'data-tip': `${value.date}: Score ${value.count}` }
                      : {}
                  }
                />
                <div className="flex items-center gap-2 mt-3 justify-center text-xs text-gray-400">
                  <span>Less</span>
                  <span className="w-4 h-4 rounded border" style={{ backgroundColor: '#161b22' }} />
                  <span className="w-4 h-4 rounded border" style={{ backgroundColor: '#9be9a8' }} />
                  <span className="w-4 h-4 rounded border" style={{ backgroundColor: '#40c463' }} />
                  <span className="w-4 h-4 rounded border" style={{ backgroundColor: '#30a14e' }} />
                  <span className="w-4 h-4 rounded border" style={{ backgroundColor: '#216e39' }} />
                  <span>More</span>
                </div>
                  <div className="mt-2 text-sm text-orange-500 font-semibold text-center">
                    {streak > 0 ? (
                      <>🔥 {streak}-day streak maintained!</>
                    ) : (
                      <>😔 No streak yet — time to get consistent!</>
                    )}
                </div>
              </div>
            </div>

            {/* Goal Consistency Pie Charts */}
            <div className="w-full max-w-4xl bg-zinc-900 p-8 rounded-lg shadow-lg mt-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Goal Consistency</h2>
              <div className="flex flex-row gap-6 justify-center items-end">
                <div className="flex flex-col items-center">
                  <div style={{ width: 120, height: 120 }}>
                    <Pie data={stepsPieData} options={{ plugins: { legend: { display: false } } }} />
                  </div>
                  <div className="mt-1 text-blue-400 font-bold text-base">Steps</div>
                  <div className="text-xs text-gray-400">{stepsMet} / {logs.length} days ({logs.length ? Math.round((stepsMet / logs.length) * 100) : 0}%)</div>
                </div>
                <div className="flex flex-col items-center">
                  <div style={{ width: 120, height: 120 }}>
                    <Pie data={caloriesPieData} options={{ plugins: { legend: { display: false } } }} />
                  </div>
                  <div className="mt-1 text-yellow-400 font-bold text-base">Calories</div>
                  <div className="text-xs text-gray-400">{caloriesMet} / {logs.length} days ({logs.length ? Math.round((caloriesMet / logs.length) * 100) : 0}%)</div>
                </div>
                <div className="flex flex-col items-center">
                  <div style={{ width: 120, height: 120 }}>
                    <Pie data={workoutPieData} options={{ plugins: { legend: { display: false } } }} />
                  </div>
                  <div className="mt-1 text-green-400 font-bold text-base">Workout</div>
                  <div className="text-xs text-gray-400">{workoutMet} / {logs.length} days ({logs.length ? Math.round((workoutMet / logs.length) * 100) : 0}%)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'log' && (
          <div className="w-full max-w-4xl bg-zinc-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Log Entry</h2>
            {/* Date Picker */}
            <div className="flex flex-col items-center mb-6">
              <label className="text-gray-400 mb-1">Select Date</label>
              <input
                type="date"
                value={logDate}
                onChange={e => setLogDate(e.target.value)}
                className="w-36 text-center px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-white"
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Steps */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-2">
                  <svg className="w-full h-full" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#steps-gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={
                        2 * Math.PI * 70 * (1 - Math.min(todaySteps / stepGoal, 1))
                      }
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s' }}
                    />
                    <defs>
                      <linearGradient id="steps-gradient" x1="0" y1="0" x2="160" y2="0">
                        <stop offset="0%" stopColor="#2EC4F1" />
                        <stop offset="100%" stopColor="#3A86FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <FaRunning className="text-6xl text-[#2EC4F1] mb-2" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <FaShoePrints className="text-xl text-[#2EC4F1]" />
                  <span className="text-3xl font-bold text-[#2EC4F1]">{todaySteps}</span>
                  <span className="text-lg text-[#2EC4F1]">steps</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">{todaySteps} / {stepGoal} steps</div>
                <input
                  type="number"
                  value={todaySteps === 0 ? "" : todaySteps}
                  onChange={e => setTodaySteps(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="mt-2 w-24 text-center px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-white"
                  min={0}
                />
              </div>
              {/* Calories */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-2">
                  <svg className="w-full h-full" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#calorie-gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={
                        2 * Math.PI * 70 * (1 - Math.min(todayCalories / maintenanceCalories, 1))
                      }
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s' }}
                    />
                    <defs>
                      <linearGradient id="calorie-gradient" x1="0" y1="0" x2="160" y2="0">
                        <stop offset="0%" stopColor="#FFB703" />
                        <stop offset="100%" stopColor="#FB5607" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <FaUtensils className="text-6xl text-[#FB5607] mb-2" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <FaUtensils className="text-xl text-[#FB5607]" />
                  <span className="text-3xl font-bold text-[#FB5607]">{todayCalories}</span>
                  <span className="text-lg text-[#FB5607]">cal</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">{todayCalories} / {maintenanceCalories} cal</div>
                <input
                  type="number"
                  value={todayCalories === 0 ? "" : todayCalories}
                  onChange={e => setTodayCalories(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="mt-2 w-24 text-center px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-white"
                  min={0}
                />
              </div>
              {/* Workout */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setDidWorkout(w => !w)}
                  className={`w-40 h-40 flex flex-col items-center justify-center font-bold rounded-full border-8 transition text-5xl ${
                    didWorkout ? 'border-green-600 text-green-400 bg-green-950' : 'border-zinc-600 text-gray-400 bg-zinc-800'
                  }`}
                  type="button"
                >
                  <FaDumbbell className="mb-2" />
                  {didWorkout ? 'YES' : 'NO'}
                </button>
                <div className="mt-2 text-base text-gray-300 font-semibold">Workout</div>
                <label className="flex items-center gap-4 mt-12 text-lg">
                  <input
                    type="checkbox"
                    checked={didWorkout}
                    onChange={() => setDidWorkout(w => !w)}
                    className="w-5 h-5 accent-green-500"
                  />
                  Workout done
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6 px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-300">Maintenance Calories</div>
                <div className="text-2xl font-bold text-orange-400">{maintenanceCalories} cal</div>
              </div>
              <p className="text-sm text-gray-400">
                This is the estimated number of calories you need to maintain your current weight.
                <br />
                ➤ For <span className="text-green-400 font-medium">fat loss</span>, aim for <span className="text-gray-300">10–25% less</span> (≈ {Math.round(maintenanceCalories * 0.75)}–{Math.round(maintenanceCalories * 0.9)} cal/day).<br />
                ➤ For <span className="text-blue-400 font-medium">muscle gain</span>, eat <span className="text-gray-300">10–20% more</span> (≈ {Math.round(maintenanceCalories * 1.1)}–{Math.round(maintenanceCalories * 1.2)} cal/day).
              </p>
            </div>
            {/* Save Log Button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={saveDailyLog}
                className="py-3 px-8 rounded-full bg-green-600 hover:bg-green-700 font-bold text-white text-lg transition"
              >
                Save Log
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <style>
        {`
        .react-calendar-heatmap .color-empty { fill: #161b22; }
        .react-calendar-heatmap .color-github-1 { fill: #9be9a8; }
        .react-calendar-heatmap .color-github-2 { fill: #40c463; }
        .react-calendar-heatmap .color-github-3 { fill: #30a14e; }
        `}
      </style>
    </div>
  );
}
