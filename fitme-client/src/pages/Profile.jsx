import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from '../assets/images/image.jpg';
import toast from 'react-hot-toast'; 

const API_URL = process.env.REACT_APP_API_URL;

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'light', label: 'Lightly active', desc: 'Light exercise/sports 1-3 days/week' },
  { value: 'moderate', label: 'Moderately active', desc: 'Moderate exercise/sports 3-5 days/week' },
  { value: 'very', label: 'Very active', desc: 'Hard exercise/sports 6-7 days/week' },
  { value: 'super', label: 'Super active', desc: 'Very hard exercise & physical job' },
];

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative group">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-8 py-3 rounded-full">
        <FaUserCircle className="text-4xl text-white" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-zinc-900 rounded-lg shadow-lg py-2 z-50 border border-zinc-700">
          <a href="/profile" className="block px-4 py-2 text-white hover:bg-zinc-800 transition">Profile</a>
          <div className="border-t border-zinc-700 my-1" />
          <a href="/about" className="block px-4 py-2 text-white hover:bg-zinc-800 transition">About</a>
          <div className="border-t border-zinc-700 my-1" />
          <button onClick={() => { setOpen(false); onLogout(); }} className="block w-full text-left px-4 py-2 text-white hover:bg-zinc-800 transition">Logout</button>
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activity: '',
    userImage: '',
  });
  const [profileImg, setProfileImg] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        });
                const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dob: data.dob ? data.dob.slice(0, 10) : '',
          gender: data.gender || '',
          height: data.height || '',
          weight: data.weight || '',
          goal: data.goal || '',
          activity: data.activity || '',
          userImage: data.userImage || '',
        });
        setProfileImg(data.userImage || '');
      } catch (err) {
        console.error('Failed to load profile:', err.message);
        toast.error('Failed to load profile.');
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) formData.append('userImage', selectedFile);
    Object.entries(profile).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value);
    });

    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Profile update failed');

      toast.success('Profile updated successfully!');
      setProfile({
        firstName: result.user.firstName || '',
        lastName: result.user.lastName || '',
        dob: result.user.dob ? result.user.dob.slice(0, 10) : '',
        gender: result.user.gender || '',
        height: result.user.height || '',
        weight: result.user.weight || '',
        goal: result.user.goal || '',
        activity: result.user.activity || '',
        userImage: result.user.userImage || '',
      });
      setProfileImg(result.user.userImage || '');
      localStorage.setItem('user', JSON.stringify(result.user));
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!profile) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* <Header><ProfileDropdown onLogout={handleLogout} /></Header> */}
      <Header>
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white hover:bg-zinc-700 transition duration-300 text-sm md:text-base"
            >
              DASHBOARD
            </Link>
            <ProfileDropdown onLogout={handleLogout} />
          </div>
        </Header>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group w-28 h-28" onClick={() => fileInputRef.current.click()}>
              <img
                src={profileImg || defaultProfileImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-zinc-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
            <span className="mt-2 text-gray-400 text-sm">Click to change photo</span>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="First Name" value={profile.firstName} readOnly />
            <Input label="Last Name" value={profile.lastName} readOnly />
            <Input type="date" label="Date of Birth" name="dob" value={profile.dob} onChange={handleChange} />

            <Select label="Gender" name="gender" value={profile.gender} onChange={handleChange} options={[
              { label: 'Select gender', value: '' },
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' }
            ]} />

            <Input type="number" label="Height (cm)" name="height" value={profile.height} onChange={handleChange} />
            <Input type="number" label="Weight (kg)" name="weight" value={profile.weight} onChange={handleChange} />

            <Select label="Fitness Goal" name="goal" value={profile.goal} onChange={handleChange} options={[
              { label: 'Select your goal', value: '' },
              { label: 'Lose weight', value: 'lose' },
              { label: 'Increase weight', value: 'gain' },
              { label: 'Gain muscle', value: 'muscle' },
            ]} />

            <Select label="Activity Level" name="activity" value={profile.activity} onChange={handleChange} options={[
              { label: 'Select activity level', value: '' },
              ...activityLevels.map(lvl => ({
                label: `${lvl.label} - ${lvl.desc}`,
                value: lvl.value,
              }))
            ]} />

            <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-300 transition">Save Changes</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Input({ label, type = 'text', name, value, onChange, readOnly = false }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md ${readOnly ? 'text-gray-400 cursor-not-allowed' : 'text-white'}`}
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}