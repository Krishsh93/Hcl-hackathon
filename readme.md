# 📘 Healthcare Wellness & Preventive Care Portal

## **Overview**

A comprehensive Healthcare Wellness & Preventive Care Portal that enables **patients** to track wellness goals and view preventive checkup reminders, while **providers** can monitor assigned patients and manage their preventive care plans.

The system implements a **unified backend architecture** with role-based access control (RBAC) serving both patient and provider interfaces through a shared API layer.

---

## **Table of Contents**

- [Core Features](#core-features)
- [High-Level Design (HLD)](#high-level-design-hld)
- [Tech Stack](#tech-stack)
- [Workflow](#workflow)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)

---

## **Core Features**

### **Patient Portal**

- ✅ User registration & authentication
- ✅ Personalized dashboard (health score, reminders, goals)
- ✅ Wellness goal tracking (steps, water intake, sleep hours)
- ✅ Profile management
- ✅ Real-time notifications
- ✅ Preventive checkup reminders

### **Provider Portal**

- ✅ Provider authentication with role-based access
- ✅ View assigned patient list
- ✅ Monitor patient compliance & wellness trends
- ✅ Create and manage preventive care reminders
- ✅ Send alerts and messages to patients
- ✅ Analytics dashboard

### **Shared Capabilities**

- 🔐 JWT-based authentication
- 🛡️ Role-based access control (Patient/Provider)
- 🔔 Push notifications system
- 📊 Audit logging
- 📚 Public health information portal

---

## **High-Level Design (HLD)**

```
┌─────────────────────────────────────────────────────────────────────┐
│                   HEALTHCARE WELLNESS SYSTEM                        │
│                         (Landing Page)                              │
└────────────────┬────────────────────────────────────┬───────────────┘
                 │                                    │
    ┌────────────▼──────────┐          ┌─────────────▼────────────┐
    │   PROVIDER LOGIN      │          │    PATIENT LOGIN         │
    └────────────┬──────────┘          └─────────────┬────────────┘
                 │                                    │
    ┌────────────▼──────────┐          ┌─────────────▼────────────┐
    │  PROVIDER DASHBOARD   │          │   PATIENT DASHBOARD      │
    │                       │          │                          │
    │  • View Patients      │          │  • View Doctors          │
    │  • Appointments       │          │  • Prescriptions         │
    │  • Patient Reports    │          │  • Health Reports        │
    │  • Settings           │          │      │
    │                       │          │  • Book Appointment      │
    └────────────┬──────────┘          └─────────────┬────────────┘
                 │                                    │
                 │              ┌─────────────────────┤
                 │              │                     │
    ┌────────────▼──────────────▼─────────────────────▼────────────┐
    │                  SHARED SERVICES                              │
    │                                                               │
    │                                                               │
    │  • Appointment Booking   • Wellness Goal Tracking            │
    │  • Notifications                                              │
    │                                                               │
    └────────────────────────────┬──────────────────────────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │   MONGODB ATLAS          │
                    │                          │
                    │  Collections:            │
                    │  • Users (Login Data)    │
                    │  • Goals                 │
                    │  • Reminders             │
                    │  • Appointments          │
                    │  • Notifications         │
                    │                          │
                    │  • Provider-Patient Map  │
                    └──────────────────────────┘
```

---

## **Tech Stack**

### **Frontend**

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and context |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router** | Client-side routing |
| **Axios** | HTTP client with interceptors |



### **Backend**

| Technology | Purpose |
|------------|---------|
| **Node.js 18+** | JavaScript runtime |
| **Express.js** | Web framework |
| **MongoDB Atlas** | NoSQL cloud database |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcrypt** | Password hashing |




---

## **Workflow**

### **User Authentication Flow**

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Enter credentials
     ▼
┌─────────────────┐
│  Login Page     │
└────┬────────────┘
     │
     │ 2. POST /api/auth/login
     ▼
┌──────────────────────┐
│  Auth Controller     │
│  • Validate input    │
│  • Check credentials │
│  • Generate JWT      │
└────┬─────────────────┘
     │
     │ 3. Return token + user data
     ▼
┌─────────────────┐
│  Frontend       │
│  • Store token  │
│  • Set context  │
│  • Redirect     │
└────┬────────────┘
     │
     │ 4. Navigate to dashboard
     ▼
┌──────────────────┐
│  Dashboard       │
│  (Patient or     │
│   Provider)      │
└──────────────────┘
```


### **Provider Patient Monitoring Flow**

```
┌──────────────┐
│   Provider   │
└──────┬───────┘
       │
       │ 1. View patients list
       ▼
┌────────────────────┐
│  Patients Page     │
└──────┬─────────────┘
       │
       │ 2. GET /api/provider/patients
       ▼
┌────────────────────────┐
│  Provider Controller   │
│  • Get provider ID     │
│  • Query mappings      │
└──────┬─────────────────┘
       │
       │ 3. Fetch patient data
       ▼
┌────────────────────────┐
│  Database              │
│  • ProviderPatientMap  │
│  • Users (patients)    │
│  • Goals (aggregated)  │
└──────┬─────────────────┘
       │
       │ 4. Return patient list with stats
       ▼
┌────────────────────────┐
│  Frontend              │
│  • Display table       │
│  • Show compliance %   │
└──────┬─────────────────┘
       │
       │ 5. Click patient → View details
       ▼
┌────────────────────────┐
│  Patient Detail Page   │
│  • Goals chart         │
│  • Reminders           │
│  • Send message        │
└────────────────────────┘
```

## **API Reference**

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### **Patient Endpoints**

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/patient/dashboard` | Get patient dashboard data | Patient |
| POST | `/api/patient/goals` | Create wellness goal | Patient |
| GET | `/api/patient/goals` | Get patient goals | Patient |
| PUT | `/api/patient/goals/:id` | Update goal progress | Patient |
| GET | `/api/patient/reminders` | Get upcoming reminders | Patient |
| PUT | `/api/patient/profile` | Update profile | Patient |

### **Provider Endpoints**

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/provider/patients` | Get assigned patients | Provider |
| GET | `/api/provider/patient/:id` | Get patient details | Provider |
| GET | `/api/provider/patient/:id/goals` | Get patient goal history | Provider |
| POST | `/api/provider/reminder` | Create preventive reminder | Provider |
| POST | `/api/provider/message` | Send message to patient | Provider |
| GET | `/api/provider/analytics` | Get provider analytics | Provider |

### **Shared Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notifications` | Get user notifications | Yes |
| PUT | `/api/notifications/:id/read` | Mark notification as read | Yes |
| GET | `/api/public/health-info` | Get public health articles | No |
| GET | `/api/health` | API health check | No |

---

## **Database Schema**

### **Users Collection**

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['patient', 'provider']),
  profile: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    phone: String,
    address: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### **Goals Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  type: String (enum: ['steps', 'water', 'sleep', 'exercise']),
  target: Number,
  current: Number,
  date: Date,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Notifications Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  message: String,
  type: String (enum: ['reminder', 'goal', 'message', 'alert']),
  read: Boolean,
  createdAt: Date
}
```

### **ProviderPatientMap Collection**

```javascript
{
  _id: ObjectId,
  providerId: ObjectId (ref: User),
  patientId: ObjectId (ref: User),
  assignedDate: Date,
  status: String (enum: ['active', 'inactive']),
  createdAt: Date
}
```

## **Team**

Built for HCL Hackathon 2025

---


**Live Demo**: [Coming Soon]

**Repository**: https://github.com/Krishsh93/Hcl-hackathon
