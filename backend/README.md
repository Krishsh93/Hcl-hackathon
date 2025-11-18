# Backend (Express + MongoDB)

Healthcare Wellness Portal backend API with role-based access control.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
copy .env.example .env
```

3. Update `.env` with your MongoDB Atlas connection string:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

4. Start development server:
```bash
npm run dev
```

The server runs on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires auth)

### Patient (requires patient role)
- `GET /api/v1/patient/dashboard` - Get dashboard stats
- `GET /api/v1/patient/records` - Get health records
- `POST /api/v1/patient/records` - Add health record (sleep, water, exercise)

### Doctor (requires doctor role)
- `GET /api/v1/doctor/dashboard` - Get doctor dashboard
- `GET /api/v1/doctor/patients` - Get all patients
- `GET /api/v1/doctor/patients/:id` - Get patient details

### Appointments (requires auth)
- `GET /api/v1/appointments` - Get appointments
- `POST /api/v1/appointments` - Create appointment
- `PATCH /api/v1/appointments/:id/status` - Update appointment status

### Notifications (requires auth)
- `GET /api/v1/notifications` - Get notifications
- `PATCH /api/v1/notifications/:id/read` - Mark as read
- `PATCH /api/v1/notifications/read-all` - Mark all as read

### Public
- `GET /api/v1/public/doctors` - Get all doctors (no auth required)

## Database Models

- **User** - Both patients and doctors
- **PatientRecord** - Sleep, water, exercise tracking
- **Appointment** - Appointment bookings
- **Notification** - System notifications

## Tech Stack

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcrypt for password hashing