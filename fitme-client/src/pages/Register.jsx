import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import treadmillImage from '../assets/images/treadmill.avif';
import Footer from '../components/Footer';
import Header from '../components/Header';

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    // userImage: '', // Uncomment if you want to support profile image upload
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

    // Prepare payload matching the backend schema
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      // userImage: formData.userImage, // Uncomment if you add image support
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

      // --- Store token and user info from backend response ---
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      // -------------------------------------------------------

      // Registration successful, redirect to onboarding
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
             className="text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300"
               >
             LOGIN
            </Link>
            <Link
          to="/about"
          className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          ABOUT US
        </Link>
      </Header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          {/* Background Image */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: `url(${treadmillImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1,
              filter: 'brightness(0.8)',
            }}
          ></div>
          
          {/* Form Container */}
          <div className="relative z-10 bg-black bg-opacity-70 p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-2 text-center">WELCOME TO FIT-ME</h1>
            <p className="mb-8 text-center">START YOUR JOURNEY!</p>
            
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {error && (
                <div className="text-red-400 text-center font-semibold">{error}</div>
              )}
              <div>
                <label htmlFor="firstName" className="block mb-2 font-medium">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block mb-2 font-medium">
                  LAST NAME
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                  required
                />
              </div>
              
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
              
              {/* Uncomment if you want a profile image field
              <div>
                <label htmlFor="userImage" className="block mb-2 font-medium">
                  PROFILE IMAGE URL
                </label>
                <input
                  type="text"
                  id="userImage"
                  name="userImage"
                  placeholder="enter image URL"
                  value={formData.userImage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
                />
              </div>
              */}
              
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-gray-300 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'REGISTER'}
              </button>
              
              <div className="text-center">
                <p>
                  ALREADY A USER? 
                  <Link to="/login" className="text-white font-bold underline ml-1">
                    LOGIN
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />  
    </div>
  );
}
