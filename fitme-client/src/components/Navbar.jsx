// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-black">
      <Link to="/" className="text-2xl md:text-3xl font-bold tracking-wider mb-4 md:mb-0">
        FIT- ME
      </Link>
      <nav className="flex flex-wrap gap-2 md:gap-4 justify-center">
        <Link
          to="/auth"
          className="bg-[#1a1a1a] px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          LOGIN
        </Link>
        <Link
          to="/auth"
          onClick={() => localStorage.setItem('authMode', 'register')}
          className="bg-[#1a1a1a] px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          REGISTER
        </Link>
        <Link
          to="/about"
          className="bg-[#1a1a1a] px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          ABOUT US
        </Link>
      </nav>
    </header>
  );
}
