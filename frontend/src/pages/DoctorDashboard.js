import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/dashboard.css';

function AppointmentCard({ appt }) {
  const patientName = appt.patientId 
    ? `${appt.patientId.firstName} ${appt.patientId.lastName}` 
    : 'Patient';
  
  return (
    <div className="today-appt-card">
      <div className="appt-patient">{patientName}</div>
      <div className="appt-time">{appt.time}</div>
      <div className="appt-reason">{appt.reason}</div>
      <span className={`status status-${appt.status}`}>{appt.status}</span>
    </div>
  );
}

export default function DoctorDashboard() {
  const [stats, setStats] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await api.get('/v1/doctor/dashboard');
        setStats(data?.stats || null);
        const appts = data?.todayAppointments || [];
        setTodayAppointments(Array.isArray(appts) ? appts : []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="dashboard container">
      <h2>Doctor Dashboard</h2>
      <div className="grid">
        <div className="card stat-card doctor-stat">
          <div className="stat-label">Today's Appointments</div>
          <div className="stat-value">{stats?.todayAppointments || 0}</div>
        </div>
        <div className="card stat-card doctor-stat">
          <div className="stat-label">Total Patients</div>
          <div className="stat-value">{stats?.totalPatients || 0}</div>
        </div>
        <div className="card stat-card doctor-stat">
          <div className="stat-label">Scheduled</div>
          <div className="stat-value">{stats?.appointmentsByStatus?.scheduled || 0}</div>
        </div>
        <div className="card stat-card doctor-stat">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{stats?.appointmentsByStatus?.completed || 0}</div>
        </div>
      </div>
      <section className="panel">
        <h3>Today's Schedule</h3>
        {todayAppointments.length === 0 && (
          <p className="muted">No appointments scheduled for today.</p>
        )}
        <div className="today-appts-grid">
          {todayAppointments.map((appt) => (
            <AppointmentCard key={appt._id} appt={appt} />
          ))}
        </div>
      </section>
    </div>
  );
}
