// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold mb-3">
              <span className="text-white">FIT</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">GRID</span>
            </div>
            <p className="text-sm leading-relaxed">
              Track your fitness journey with precision. Log workouts, monitor calories, 
              and visualize your progress — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors duration-200">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors duration-200">Register</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/siddhant1405" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xl">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xl">
                <FaLinkedin />
              </a>
              <a href="mailto:siddhant@example.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xl">
                <FaEnvelope />
              </a>
            </div>
            <p className="text-sm mt-4">Built by <span className="text-white font-medium">Siddhant Gupta</span></p>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-zinc-800 mt-8 pt-6 flex justify-center items-center text-xs text-center">
          <p>&copy; {new Date().getFullYear()} FitGrid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
