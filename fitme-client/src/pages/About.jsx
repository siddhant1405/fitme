// src/pages/About.jsx
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FaReact, FaNodeJs, FaDatabase, FaLock, FaChartPie, FaThLarge, FaGithub } from 'react-icons/fa';
import { SiExpress, SiJsonwebtokens, SiTailwindcss } from 'react-icons/si';

const techStack = [
  { icon: <FaReact />, name: 'React 19', color: 'text-cyan-400' },
  { icon: <FaNodeJs />, name: 'Node.js', color: 'text-green-400' },
  { icon: <SiExpress />, name: 'Express 5', color: 'text-gray-300' },
  { icon: <FaDatabase />, name: 'MongoDB', color: 'text-blue-400' },
  { icon: <SiJsonwebtokens />, name: 'JWT Auth', color: 'text-pink-400' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: 'text-sky-400' },
];

const highlights = [
  {
    icon: <FaThLarge className="text-2xl" />,
    title: 'GitHub-Style Progress Grid',
    desc: 'A full-year heatmap that scores each day (0–3) based on whether you hit your steps, calorie, and workout goals. Your consistency becomes visible at a glance — just like a contribution graph.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: <FaChartPie className="text-2xl" />,
    title: 'Smart Calorie Calculation',
    desc: 'Maintenance calories are computed using the Mifflin-St Jeor equation, factoring in your gender, age, weight, height, and activity level. The app then adjusts recommendations based on whether you want to lose weight, gain weight, or build muscle.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: <FaLock className="text-2xl" />,
    title: 'Secure Authentication',
    desc: 'Passwords are hashed with bcrypt (10 salt rounds) and sessions are managed via JSON Web Tokens with 7-day expiry. All dashboard and profile routes are protected behind auth middleware.',
    gradient: 'from-violet-500 to-purple-500',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header>
        <Link
          to="/login"
          className="text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300"
        >
          LOGIN
        </Link>
        <Link
          to="/register"
          className="text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300"
        >
          REGISTER
        </Link>
        <Link
          to="/"
          className="text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300"
        >
          HOME
        </Link>
      </Header>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60 text-xs md:text-sm text-gray-300 mb-6 tracking-wide">
          ABOUT THE PROJECT
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          THE STORY BEHIND{' '}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            FITGRID
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          FitGrid was born from a simple idea: what if tracking your fitness felt 
          as satisfying as watching a GitHub contribution graph fill up? This project 
          combines full-stack engineering with fitness science to create a tool 
          that turns daily habits into visible, measurable progress.
        </p>
      </section>

      {/* What Makes It Different */}
      <section className="py-16 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            WHAT MAKES IT{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              DIFFERENT
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br ${h.gradient} text-white mb-4`}>
                  {h.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{h.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            BUILT WITH
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300"
              >
                <span className={`text-3xl ${tech.color}`}>{tech.icon}</span>
                <span className="text-xs text-gray-400 font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            HOW IT WORKS
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl font-bold">1</div>
                <h4 className="font-bold text-white">Sign Up & Onboard</h4>
                <p className="text-gray-400 text-sm">Create an account and tell us your body metrics, fitness goal, and activity level.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-xl font-bold">2</div>
                <h4 className="font-bold text-white">Log Daily</h4>
                <p className="text-gray-400 text-sm">Track your steps, calorie intake, and whether you worked out — for any date.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl font-bold">3</div>
                <h4 className="font-bold text-white">Watch Your Grid Grow</h4>
                <p className="text-gray-400 text-sm">Your progress grid fills up as you stay consistent. Build streaks and track goal consistency via pie charts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">THE DEVELOPER</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            FitGrid was designed and built by <span className="text-white font-semibold">Siddhant Gupta</span>, 
            a full-stack developer passionate about building tools that solve real problems. 
            This project showcases skills in React, Node.js, MongoDB, REST API design, 
            JWT authentication, and data visualization.
          </p>
          <a
            href="https://github.com/siddhant1405"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 hover:bg-zinc-800 transition duration-300 text-sm font-medium"
          >
            <FaGithub className="text-lg" />
            VIEW ON GITHUB
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
