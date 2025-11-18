# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- npm or yarn package manager

## Setup Steps

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy your connection string
5. In Network Access, add IP `0.0.0.0/0` (for development only)

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Update .env file
# Open .env and paste your MongoDB connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare
# JWT_SECRET=your-secret-key-here

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Using the Application

### First Time Setup

1. Open `http://localhost:5173` in your browser
2. You'll see the landing page with options for Patient and Doctor

### Create Accounts

**Patient Account:**
1. Click "Patient Sign Up"
2. Fill in details (email, password, name)
3. Login redirects to Patient Dashboard

**Doctor Account:**
1. Click "Doctor Sign Up"
2. Fill in details + specialization
3. Login redirects to Doctor Dashboard

### Test the Features

**As a Patient:**
- ✅ Track sleep, water intake, exercise in dashboard
- ✅ Book appointments with doctors
- ✅ View notifications
- ✅ See weekly averages

**As a Doctor:**
- ✅ View all patients
- ✅ See appointments
- ✅ Update appointment status
- ✅ View patient details

## 🔧 Troubleshooting

**Backend won't start:**
- Make sure MongoDB connection string is correct in `.env`
- Check if port 5000 is available

**Frontend won't connect to backend:**
- Ensure backend is running on port 5000
- Check `.env` file has `VITE_API_URL=http://localhost:5000/api`

**Can't login:**
- Make sure you registered an account first
- Check browser console for errors

## 📱 Main Features

✅ Landing page with role selection
✅ Sign in / Sign up with role-based access
✅ Patient Dashboard with health tracking
✅ Doctor Dashboard with patient management
✅ Appointment booking system
✅ Notifications for reminders
✅ Clean and simple UI

## 🗄️ Database Collections

The application automatically creates these collections:
- `users` - Patient and doctor accounts
- `patientrecords` - Sleep, water, exercise data
- `appointments` - Booking information
- `notifications` - System notifications

## 📊 Sample Test Flow

1. **Create Doctor Account**
   - Email: doctor@test.com
   - Password: password123
   - Specialization: General Physician

2. **Create Patient Account**
   - Email: patient@test.com
   - Password: password123

3. **Patient Actions:**
   - Add sleep record: 8 hours
   - Add water intake: 6 glasses
   - Book appointment with the doctor

4. **Doctor Actions:**
   - View dashboard (should see 1 appointment)
   - Go to appointments
   - Update appointment status to "completed"

## 🚀 Deployment

**Backend:** Can be deployed to Render, Railway, or Heroku
**Frontend:** Can be deployed to Vercel or Netlify
**Database:** Already on MongoDB Atlas (cloud)

---

**Note:** This is a hackathon project with clean, simple code. No unnecessary complexity!
