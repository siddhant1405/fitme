// src/components/Header.jsx
import logo from '../assets/images/logo.png'; // Adjust path as needed

export default function Header({ children }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-3 bg-black border-b border-zinc-700">
      <div className="flex items-center mb-4 md:mb-0 transition">
        <img 
          src={logo}
          alt="FitMe Logo"
          className="h-10 w-auto mr-2"
        />
        <div className="text-2xl md:text-3xl font-bold tracking-wider">
          FIT-ME
        </div>
      </div>
      <nav className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {children}
      </nav>
    </header>
  );
}
