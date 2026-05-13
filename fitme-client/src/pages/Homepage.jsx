import { Link } from 'react-router-dom';
import { FaChartLine, FaFireAlt, FaDumbbell, FaBullseye } from 'react-icons/fa';
import workoutImage from '../assets/images/workout.jpg';
import foodImage from '../assets/images/healthyfood.avif';
import treadmillImage from '../assets/images/treadmill.avif';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  {
    icon: <FaChartLine className="text-3xl" />,
    title: 'Progress Grid',
    desc: 'GitHub-style heatmap to visualize your daily consistency at a glance.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <FaFireAlt className="text-3xl" />,
    title: 'Streak Tracking',
    desc: 'Stay motivated with consecutive day streaks and goal scoring.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: <FaDumbbell className="text-3xl" />,
    title: 'Daily Logging',
    desc: 'Log steps, calories, and workouts with beautiful progress rings.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: <FaBullseye className="text-3xl" />,
    title: 'Smart Calories',
    desc: 'Personalized maintenance calories using the Mifflin-St Jeor equation.',
    color: 'from-yellow-500 to-amber-500',
  },
];

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
          className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:opacity-90 transition duration-300 text-sm md:text-base"
        >
          GET STARTED
        </Link>
        <Link
          to="/about"
          className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
        >
          ABOUT
        </Link>
      </Header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Grid */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 h-full gap-0">
          {[workoutImage, foodImage, treadmillImage].map((image, index) => (
            <div
              key={index}
              className="bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center 30%',
              }}
            />
          ))}
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60 text-xs md:text-sm text-gray-300 mb-6 tracking-wide backdrop-blur-sm">
            YOUR FITNESS JOURNEY, VISUALIZED
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            TRAIN HARD.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              TRACK SMARTER.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Log your workouts, monitor calories, and watch your consistency grow 
            with a GitHub-style progress grid. Built for people who take their 
            fitness seriously.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20"
            >
              START FOR FREE
            </Link>
            <Link
              to="/about"
              className="px-10 py-4 rounded-full border border-zinc-600 text-white font-semibold text-lg hover:bg-zinc-800 transition duration-300"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            EVERYTHING YOU NEED TO{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              STAY ON TRACK
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-2xl mx-auto">
            FitGrid combines daily logging, smart analytics, and visual motivation 
            to help you build lasting fitness habits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${f.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            READY TO BUILD YOUR{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              STREAK?
            </span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join FitGrid today and start turning your daily habits into visible progress.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/20"
          >
            CREATE YOUR ACCOUNT
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
