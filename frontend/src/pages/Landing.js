import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero container">
        <div className="hero-left">
          <h1>Care that fits your life</h1>
          <p>Book appointments, get clinical records, and connect with trusted doctors.</p>
          <div className="cta-row">
            <Link className="btn" to="/auth">Get Started</Link>
            <Link className="btn btn-light" to="/auth">I am a Doctor</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="card">
            <h3>Quick actions</h3>
            <ul>
              <li>Book an appointment</li>
              <li>View prescriptions</li>
              <li>Secure messaging</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
