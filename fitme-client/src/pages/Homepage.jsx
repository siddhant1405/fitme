import { Link } from 'react-router-dom';
import workoutImage from '../assets/images/workout.jpg';
import foodImage from '../assets/images/healthyfood.avif';
import treadmillImage from '../assets/images/treadmill.avif';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-black">
        <div className="text-2xl md:text-3xl font-bold tracking-wider mb-4 md:mb-0">
          FIT- ME
        </div>
        <nav className="flex flex-wrap gap-2 md:gap-4 justify-center">
          {/* Change this part */}
          <Link
            to="/auth"
            className="bg-[#1a1a1a] px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
          >
            LOGIN
          </Link>
          <Link
            to="/auth"
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

      {/* Main Content */}
      <main className="relative min-h-[70vh] md:h-[calc(100vh-80px)]">
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-1">
          {[workoutImage, foodImage, treadmillImage].map((image, index) => (
            <div
              key={index}
              className="bg-cover bg-center opacity-90"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center 30%',
              }}
            />
          ))}
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-black bg-opacity-95 px-8 md:px-20 py-8 md:py-12 text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 tracking-wider">TRAIN HARD.</h1>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 tracking-wider">EAT HEALTHY.</h1>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider">TRACK DAILY.</h1>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-3 text-center">
        <div className="container mx-auto">
          <p className="text-sm md:text-base">DEVELOPED BY SIDDHANT GUPTA</p>
        </div>
      </footer>
    </div>
  );
} 