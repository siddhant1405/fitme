import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      navigate('/onboarding');
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
            to="/login"
            className="text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-zinc-800 transition duration-300 text-sm md:text-base"
          >
            LOGIN
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
            <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
            <p className="text-sm text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
            
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-md border border-red-400/20">{error}</div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder:text-zinc-600 text-sm transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder:text-zinc-600 text-sm transition-colors"
                  required
                />
              </div>
            </div>
            
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
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
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
              className="w-full py-2.5 mt-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </main>
      
      <Footer />  
    </div>
  );
}
