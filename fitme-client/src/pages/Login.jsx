import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import workoutImage from '../assets/images/workout.jpg';
import Footer from '../components/Footer';
import Header from '../components/Header';

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      // Save token and user info (you can use localStorage or context)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header>
        <Link 
          to="/register"
          className="text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300"
        >
          REGISTER
        </Link>
        <Link
          to="/about"
          className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          ABOUT US
        </Link>
      </Header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Background Image */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: `url(${workoutImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1,
              filter: 'brightness(0.9)',
            }}
          ></div>
          
          {/* Form Container */}
          <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-2 text-center">WELCOME BACK!</h1>
            <p className="mb-8 text-center">
              DONT HAVE AN ACCOUNT? 
              <Link to="/register" className="text-white font-bold underline ml-1">
                SIGNUP
              </Link>
            </p>
            
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {error && (
                <div className="text-red-400 text-center font-semibold">{error}</div>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 font-medium">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                  required
                />
              </div>
              
              <div className="text-left">
                <a href="#" className="text-white hover:underline">
                  FORGOT PASSWORD?
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-gray-300 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
