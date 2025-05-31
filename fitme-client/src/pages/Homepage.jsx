import { Link } from 'react-router-dom';
import workoutImage from '../assets/images/workout.jpg';
import foodImage from '../assets/images/healthyfood.avif';
import treadmillImage from '../assets/images/treadmill.avif';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header>
        <Link
          to="/login"
          className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          LOGIN
        </Link>
        <Link
          to="/register"
          className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
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
      <Footer />
    </div>
  );
}
