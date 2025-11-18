import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSavedToken, setAuthToken } from '../api';
import api from '../api';
import '../styles/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getSavedToken();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const { data } = await api.get('/v1/auth/me');
          setUserRole(data?.user?.role || data?.role);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [token]);

  const handleLogout = () => {
    setAuthToken(null);
    setUserRole(null);
    navigate('/');
  };

  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link className="brand" to="/">HealthWell</Link>
        <nav>
          <Link to="/">Home</Link>
          {!token && <Link to="/auth">Sign In</Link>}
          {token && userRole === 'patient' && <Link to="/patient">Dashboard</Link>}
          {token && userRole === 'doctor' && <Link to="/doctor">Dashboard</Link>}
          {token && <Link to="/appointments">Appointments</Link>}
          {token && <button className="btn-ghost" onClick={handleLogout}>Logout</button>}
        </nav>
      </div>
    </header>
  );
}
