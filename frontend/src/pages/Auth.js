import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import '../styles/auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [message, setMessage] = useState('');

  const switchMode = () => {
    setIsLogin((s) => !s);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await api.post('/v1/auth/login', { email, password });
        const token = data.token || data?.data?.token || data?.accessToken;
        if (token) {
          setAuthToken(token);
          window.location.href = role === 'doctor' ? '/doctor' : '/patient';
        } else {
          setMessage('Login succeeded but token not found');
        }
      } else {
        const payload = { firstName, lastName, email, password, role, phone };
        if (role === 'doctor' && specialization) {
          payload.specialization = specialization;
        }
        const { data } = await api.post('/v1/auth/register', payload);
        setMessage('Registered successfully. Please sign in.');
        setIsLogin(true);
      }
    } catch (err) {
      const text = err?.response?.data?.message || err.message || 'Request failed';
      setMessage(text);
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card">
        <h2>{isLogin ? 'Sign In' : 'Create an account'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" type="tel" />
            </>
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />

          <div className="role-row">
            <label>
              <input type="radio" name="role" value="patient" checked={role === 'patient'} onChange={() => setRole('patient')} /> Patient
            </label>
            <label>
              <input type="radio" name="role" value="doctor" checked={role === 'doctor'} onChange={() => setRole('doctor')} /> Doctor
            </label>
          </div>

          {!isLogin && role === 'doctor' && (
            <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Specialization (required for doctors)" required />
          )}

          <div className="form-actions">
            <button className="btn" type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
            <button type="button" className="btn btn-light" onClick={switchMode}>{isLogin ? 'Create account' : 'Have an account? Sign in'}</button>
          </div>
        </form>
        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}
