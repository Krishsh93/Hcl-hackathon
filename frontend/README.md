# Health Wellness Platform - Frontend

React app for the Health Wellness Platform with landing page, authentication, and dashboards for doctors and patients.

## Features

- **Landing Page** – Hero section with CTA
- **Authentication** – Sign in/sign up for doctors and patients with role selection
- **Doctor Dashboard** – View appointments, pending requests, and messages
- **Patient Dashboard** – Track next appointment, prescriptions, and health records
- **Appointments** – List, confirm, and cancel appointments

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment** (optional)

Create `.env` in `frontend/` to override the default API URL:

```
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Start the dev server**

```bash
npm start
```

App runs at `http://localhost:3000`.

## Backend Integration

The frontend expects the backend API at `http://localhost:5000/api` by default.

**Key endpoints used:**
- `POST /v1/auth/register` – Create account
- `POST /v1/auth/login` – Sign in
- `GET /v1/auth/me` – Get current user
- `GET /v1/appointments` – List appointments
- `PATCH /v1/appointments/:id/status` – Update appointment status

Ensure the backend is running before testing the app.

## Tech Stack

- React 18
- React Router 6
- Axios for HTTP requests
- Custom CSS (no Tailwind)
