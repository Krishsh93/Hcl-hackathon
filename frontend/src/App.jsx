import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AppointmentsPage from './pages/AppointmentsPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/appointments"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <AppointmentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/notifications"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          
          {/* Doctor Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <AppointmentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/notifications"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
