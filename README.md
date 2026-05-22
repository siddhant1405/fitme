# 🏋️ FitMe

A full-stack fitness tracking web application that helps users log daily workouts, monitor calorie intake, track steps, and visualize consistency through a GitHub-style progress heatmap. Built with React and Node.js.

---

## ✨ Features

- **User Authentication** — Secure registration and login with JWT-based auth and bcrypt password hashing
- **Onboarding Flow** — Personalized setup collecting gender, age, height, weight, fitness goal, and activity level
- **Smart Calorie Calculator** — Maintenance calories computed using the Mifflin-St Jeor equation adjusted for activity level
- **Daily Logging** — Log steps, calorie intake, and workout completion for any date
- **GitHub-Style Progress Grid** — Calendar heatmap visualizing daily consistency with a 0–3 scoring system
- **Streak Tracking** — Consecutive-day streak counter to keep motivation high
- **Goal Consistency Charts** — Pie charts showing what percentage of logged days met step, calorie, and workout targets
- **Profile Management** — Update personal details and upload a profile photo
- **Responsive Design** — Dark-themed UI built with Tailwind CSS, optimized for desktop and mobile

---

## 🛠️ Tech Stack

### Frontend (`fitme-client`)

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |
| Chart.js + react-chartjs-2 | Pie charts for goal consistency |
| react-calendar-heatmap | GitHub-style progress grid |
| react-hot-toast | Toast notifications |
| react-icons | Icon library |
| Lottie React | Animations |

### Backend (`fitme-server`)

| Technology | Purpose |
|---|---|
| Express 5 | Web framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens | Authentication |
| bcryptjs | Password hashing |
| Multer | Profile image uploads |
| dotenv | Environment variable management |
| CORS | Cross-origin request handling |

---

## 📁 Project Structure

```
fitme/
├── fitme-client/                # React frontend
│   ├── public/
│   └── src/
│       ├── assets/images/       # Static images (hero, defaults)
│       ├── components/
│       │   ├── Header.jsx       # Reusable header/navbar
│       │   └── Footer.jsx       # Reusable footer
│       ├── pages/
│       │   ├── Homepage.jsx     # Landing page with hero & features
│       │   ├── Login.jsx        # Login form
│       │   ├── Register.jsx     # Registration form
│       │   ├── Onboarding.jsx   # Post-signup profile setup
│       │   ├── Dashboard.jsx    # Heatmap, charts, daily log
│       │   ├── Profile.jsx      # Edit profile & upload photo
│       │   └── About.jsx        # About page
│       ├── App.js               # Route definitions
│       └── index.js             # Entry point
│
├── fitme-server/                # Express backend
│   └── src/
│       ├── controllers/
│       │   ├── userController.js       # Auth, onboarding, profile update
│       │   └── dashboardController.js  # Dashboard data & daily log upsert
│       ├── middlewares/
│       │   ├── authMiddleware.js       # JWT verification
│       │   └── upload.js              # Multer config for image uploads
│       ├── models/
│       │   ├── user.js                # User schema
│       │   └── dailyLog.js            # Daily log schema
│       ├── routes/
│       │   └── userRoutes.js          # All API routes
│       ├── uploads/                   # Uploaded profile images
│       └── app.js                     # Server entry point
│
└── package.json                 # Root dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (local instance or Atlas connection string)
- **npm**

### 1. Clone the repository

```bash
git clone https://github.com/siddhant1405/fitme.git
cd fitme
```

### 2. Set up the backend

```bash
cd fitme-server
npm install
```

Create a `.env` file in `fitme-server/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fitme
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
```

Start the server:

```bash
npm run dev     # Development (with nodemon)
npm start       # Production
```

### 3. Set up the frontend

```bash
cd fitme-client
npm install
```

Create a `.env` file in `fitme-client/`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm start
```

The app will be available at **http://localhost:3000**.

---

## 📡 API Reference

All endpoints are prefixed with `/api/users`. Protected routes require a `Bearer` token in the `Authorization` header.

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/register` | Register a new user | ✗ |
| `POST` | `/login` | Login and receive JWT | ✗ |

### User Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/me` | Get current user profile | ✓ |
| `POST` | `/onboarding` | Complete onboarding setup | ✓ |
| `PATCH` | `/profile` | Update profile (supports image upload via `multipart/form-data`) | ✓ |

### Dashboard & Logging

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/dashboard` | Get maintenance calories & yearly logs | ✓ |
| `POST` | `/log` | Add or update a daily log entry | ✓ |

---

## 🧮 How Scoring Works

Each logged day receives a score from **0 to 3** based on three goals:

| Goal | Condition |
|------|-----------|
| **Steps** | ≥ 10,000 steps |
| **Calories** | Below maintenance (weight loss) or above maintenance (muscle/weight gain) |
| **Workout** | Workout completed |

The heatmap color intensity reflects the daily score, and consecutive days with score > 0 build your **streak**.

---

## 📄 License

This project is licensed under the ISC License.
