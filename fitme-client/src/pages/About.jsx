// src/pages/About.jsx
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">ABOUT FIT-ME</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="mb-6 text-lg">
            FIT-ME is a comprehensive fitness tracking application designed to help you achieve your health and wellness goals. 
            Our platform allows you to track your workouts, monitor your nutrition, and visualize your progress over time.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6 text-lg">
            We believe that fitness should be accessible to everyone. Our mission is to provide a simple yet powerful tool 
            that empowers you to take control of your health journey, whether you're just starting out or are a seasoned fitness enthusiast.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc pl-6 mb-6 text-lg space-y-2">
            <li>Track daily workouts and exercises</li>
            <li>Monitor calorie intake and nutrition</li>
            <li>Visualize progress with intuitive heatmaps</li>
            <li>Set personalized fitness goals</li>
            <li>Receive tailored recommendations</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4">The Developer</h2>
          <p className="mb-6 text-lg">
            FIT-ME was developed by Siddhant Gupta, a passionate developer with a keen interest in fitness and technology. 
            This project combines these interests to create a tool that helps people live healthier lives.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
