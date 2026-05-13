import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

      // Save token and user info
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
          className="text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-zinc-800 transition duration-300 text-sm md:text-base"
        >
          REGISTER
        </Link>
        <Link
          to="/about"
          className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-800 transition duration-300 text-sm md:text-base"
        >
          ABOUT US
        </Link>
      </Header>
      
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 shadow-xl rounded-2xl p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-md border border-red-400/20">{error}</div>
            )}
            
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-transparent border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder:text-zinc-600 text-sm transition-colors"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <span className="text-xs text-blue-500 hover:text-blue-400 font-medium cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-transparent border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder:text-zinc-600 text-sm transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
