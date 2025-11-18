import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/doctor"
            element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}
          />
          <Route
            path="/patient"
            element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}
          />
          <Route
            path="/appointments"
            element={<ProtectedRoute><Appointments /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
