import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'light', label: 'Lightly active', desc: 'Light exercise/sports 1-3 days/week' },
  { value: 'moderate', label: 'Moderately active', desc: 'Moderate exercise/sports 3-5 days/week' },
  { value: 'very', label: 'Very active', desc: 'Hard exercise/sports 6-7 days/week' },
  { value: 'super', label: 'Super active', desc: 'Very hard exercise & physical job' },
];

const API_URL = process.env.REACT_APP_API_URL;

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-8 py-3 rounded-full hover: transition"
        aria-label="Open profile menu"
      >
        <FaUserCircle className="text-4xl text-white" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-zinc-900 rounded-lg shadow-lg py-2 z-50 border border-zinc-700">
          <Link
            to="/profile"
            className="block px-4 py-2 text-white hover:bg-zinc-800 transition"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <div className="border-t border-zinc-700 my-1" />
          <Link
            to="/support"
            className="block px-4 py-2 text-white hover:bg-zinc-800 transition"
            onClick={() => setOpen(false)}
          >
            Support
          </Link>
          <div className="border-t border-zinc-700 my-1" />
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-800 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    gender: '',
    dob: '',
    height: '',
    weight: '',
    goal: '',
    activity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { gender, dob, height, weight, goal, activity } = form;
    if (!gender || !dob || !height || !weight || !goal || !activity) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to complete onboarding.');
        setLoading(false);
        return;
      }

      // Prepare payload
      const payload = {
        gender,
        dob,
        height: Number(height),
        weight: Number(weight),
        goal,
        activity: activity,
      };

      const res = await fetch(`${API_URL}/api/users/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Onboarding failed');
        setLoading(false);
        return;
      }

      // Optionally update user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header>
        <ProfileDropdown onLogout={handleLogout} />
      </Header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2 text-center">TELL US ABOUT YOU</h1>
          <p className="mb-8 text-center">Personalize your FitMe experience!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-400 text-center font-semibold">{error}</div>
            )}
            {/* Gender + DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">GENDER</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">DATE OF BIRTH</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-white"
                />
              </div>
            </div>

            {/* Height + Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">HEIGHT (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter height in cm"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">WEIGHT (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter weight in kg"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-white"
                />
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block mb-2 font-medium">FITNESS GOAL</label>
              <select
                name="goal"
                value={form.goal}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-white"
              >
                <option value="">Select your goal</option>
                <option value="lose">Lose weight</option>
                <option value="gain">Increase weight</option>
                <option value="muscle">Gain muscle</option>
              </select>
            </div>

            {/* Activity */}
            <div>
              <label className="block mb-2 font-medium">ACTIVITY LEVEL</label>
              <select
                name="activity"
                value={form.activity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md text-white"
              >
                <option value="">Select activity level</option>
                {activityLevels.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label} - {lvl.desc}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-gray-300 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'START YOUR JOURNEY!'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
