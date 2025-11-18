# 📋 Quick Reference Card

## 🚀 Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## 🔑 Sample Credentials

### Patient
```
Email: patient@test.com
Password: password123
```

### Doctor
```
Email: doctor@test.com
Password: password123
```

## 📡 Quick API Tests (Using Postman/Thunder Client)

### Register Patient
```
POST http://localhost:5000/api/v1/auth/register
Body (JSON):
{
  "email": "patient@test.com",
  "password": "password123",
  "role": "patient",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```
POST http://localhost:5000/api/v1/auth/login
Body (JSON):
{
  "email": "patient@test.com",
  "password": "password123"
}
```

### Add Health Record (requires token)
```
POST http://localhost:5000/api/v1/patient/records
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
Body (JSON):
{
  "type": "sleep",
  "value": 8,
  "unit": "hours"
}
```

## 📁 Project Structure Quick View

```
HCL/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middlewares/     # Auth & RBAC
│   │   └── server.js        # Entry point
│   └── .env                 # Config (MONGO_URI, JWT_SECRET)
│
└── frontend/
    ├── src/
    │   ├── pages/           # All page components
    │   ├── services/        # API calls
    │   ├── context/         # Auth context
    │   └── App.jsx          # Routes
    └── .env                 # Config (VITE_API_URL)
```

## 🎯 Feature Checklist

### Patient Features
- ✅ Sign up / Sign in
- ✅ Dashboard with health stats
- ✅ Track sleep, water, exercise
- ✅ Book appointments
- ✅ View notifications

### Doctor Features
- ✅ Sign up / Sign in
- ✅ Dashboard with patient stats
- ✅ View all patients
- ✅ Manage appointments
- ✅ Update appointment status
- ✅ View notifications

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Check Node version
node -v

# Check npm version
npm -v
```

## 📦 Key Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT auth
- bcrypt - Password hashing
- dotenv - Environment variables

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- tailwindcss - Styling

## 🗄️ Database Collections

| Collection | Purpose |
|------------|---------|
| users | Patient & doctor accounts |
| patientrecords | Health tracking data |
| appointments | Booking information |
| notifications | System alerts |

## 🐛 Debug Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/v1/ping

# Check MongoDB connection
# (Look for "MongoDB Atlas connected successfully" in backend terminal)

# Clear browser localStorage (if login issues)
# Browser Console: localStorage.clear()

# Check frontend env
cat frontend/.env

# Check backend env
cat backend/.env
```

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Register page

### Patient Routes (requires patient role)
- `/patient/dashboard` - Patient dashboard
- `/patient/appointments` - Appointments
- `/patient/notifications` - Notifications

### Doctor Routes (requires doctor role)
- `/doctor/dashboard` - Doctor dashboard
- `/doctor/appointments` - Appointments
- `/doctor/notifications` - Notifications

## 🎨 UI Colors

- Blue: Primary actions, patient features
- Green: Doctor features, success states
- Red: Logout, cancel, error states
- Gray: Neutral, backgrounds

## 💡 Tips

- Always start backend before frontend
- Check both terminals for errors
- Use browser DevTools Network tab to debug API calls
- MongoDB Atlas IP whitelist must include your IP
- JWT tokens expire after 7 days
- Notifications are auto-generated on appointment actions

---

**Keep this handy while developing!** 📌
