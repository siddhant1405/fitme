// src/components/Header.jsx
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Adjust path as needed

export default function Header({ children }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-3 bg-black/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <Link to="/" className="flex items-center mb-4 md:mb-0 transition group">
        <img 
          src={logo}
          alt="FitGrid Logo"
          className="h-10 w-auto mr-2 group-hover:scale-110 transition-transform duration-300"
        />
        <div className="text-2xl md:text-3xl font-bold tracking-wider">
          <span className="text-white">FIT</span><span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">GRID</span>
        </div>
      </Link>
      <nav className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {children}
      </nav>
    </header>
  );
}
