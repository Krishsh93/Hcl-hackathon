import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/dashboard.css';

function RecordItem({ record }) {
  const icons = { sleep: '😴', water: '💧', exercise: '🏃' };
  const colors = { sleep: '#818cf8', water: '#38bdf8', exercise: '#34d399' };
  
  return (
    <div className="record-item" style={{ borderLeftColor: colors[record.type] }}>
      <div className="record-header">
        <span className="record-icon">{icons[record.type]}</span>
        <strong className="record-type">{record.type}</strong>
        <span className="record-date">{new Date(record.date).toLocaleDateString()}</span>
      </div>
      <div className="record-value">
        {record.value} {record.unit}
      </div>
      {record.notes && <div className="record-notes">{record.notes}</div>}
    </div>
  );
}

function AddRecordForm({ onAdded }) {
  const [type, setType] = useState('sleep');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const units = { sleep: 'hours', water: 'glasses', exercise: 'minutes' };
  
  // Define reasonable limits for each type
  const limits = {
    sleep: { min: 0, max: 24, name: 'Sleep' },
    water: { min: 0, max: 30, name: 'Water' },
    exercise: { min: 0, max: 1440, name: 'Exercise' } // max 24 hours in minutes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate value is provided
    if (!value || value === '') {
      setMessage('Please enter a value');
      return;
    }

    const numValue = Number(value);

    // Check if value is a valid number
    if (isNaN(numValue)) {
      setMessage('Please enter a valid number');
      return;
    }

    // Check if value is within reasonable limits
    const limit = limits[type];
    if (numValue < limit.min) {
      setMessage(`${limit.name} cannot be negative`);
      return;
    }

    if (numValue > limit.max) {
      setMessage(`${limit.name} cannot exceed ${limit.max} ${units[type]}`);
      return;
    }

    // Check for decimal precision (max 1 decimal place)
    if (numValue % 0.1 !== 0 && numValue % 1 !== 0) {
      setMessage('Please use at most 1 decimal place');
      return;
    }

    try {
      await api.post('/v1/patient/records', { 
        type, 
        value: numValue, 
        unit: units[type], 
        notes 
      });
      setMessage('Record added successfully!');
      setValue('');
      setNotes('');
      onAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const text = err?.response?.data?.message || err.message || 'Failed to add record';
      setMessage(text);
    }
  };

  return (
    <div className="add-record-form">
      <h3>Track Your Health</h3>
      <form onSubmit={handleSubmit}>
        <div className="record-type-selector">
          <label className={type === 'sleep' ? 'active' : ''}>
            <input type="radio" name="type" value="sleep" checked={type === 'sleep'} onChange={() => setType('sleep')} />
            <span>😴 Sleep</span>
          </label>
          <label className={type === 'water' ? 'active' : ''}>
            <input type="radio" name="type" value="water" checked={type === 'water'} onChange={() => setType('water')} />
            <span>💧 Water</span>
          </label>
          <label className={type === 'exercise' ? 'active' : ''}>
            <input type="radio" name="type" value="exercise" checked={type === 'exercise'} onChange={() => setType('exercise')} />
            <span>🏃 Exercise</span>
          </label>
        </div>
        <div className="form-row">
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder={`Enter ${units[type]}`}
            step="0.1"
            min="0"
            max={limits[type].max}
            required 
          />
          <span className="unit-label">{units[type]}</span>
        </div>
        <div className="hint-text">
          {type === 'sleep' && <small>Valid range: 0-24 hours</small>}
          {type === 'water' && <small>Valid range: 0-30 glasses</small>}
          {type === 'exercise' && <small>Valid range: 0-1440 minutes (24 hours)</small>}
        </div>
        <input 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Notes (optional)" 
        />
        <button className="btn" type="submit">Add Record</button>
      </form>
      {message && <p className="msg success">{message}</p>}
    </div>
  );
}

export default function PatientDashboard() {
  const [stats, setStats] = useState(null);
  const [recentRecords, setRecentRecords] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  const loadDashboard = async () => {
    try {
      const { data } = await api.get('/v1/patient/dashboard');
      setStats(data?.stats || null);
      const records = data?.recentRecords || data?.records || [];
      setRecentRecords(Array.isArray(records) ? records : []);
      const upcoming = data?.upcomingAppointments || [];
      setUpcomingAppointments(Array.isArray(upcoming) ? upcoming : []);
      const recent = data?.recentAppointments || [];
      setRecentAppointments(Array.isArray(recent) ? recent : []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  return (
    <div className="dashboard container">
      <h2>Patient Dashboard</h2>
      
      <AddRecordForm onAdded={loadDashboard} />

      {stats && (
        <div className="stats-section">
          <h3>Today's Progress</h3>
          <div className="grid">
            <div className="card stat-card sleep">
              <div className="stat-icon">😴</div>
              <div className="stat-label">Sleep</div>
              <div className="stat-value">{stats.today.sleep} hrs</div>
              <div className="stat-avg">Avg: {stats.weeklyAverage.sleep} hrs</div>
            </div>
            <div className="card stat-card water">
              <div className="stat-icon">💧</div>
              <div className="stat-label">Water</div>
              <div className="stat-value">{stats.today.water} glasses</div>
              <div className="stat-avg">Avg: {stats.weeklyAverage.water} glasses</div>
            </div>
            <div className="card stat-card exercise">
              <div className="stat-icon">🏃</div>
              <div className="stat-label">Exercise</div>
              <div className="stat-value">{stats.today.exercise} min</div>
              <div className="stat-avg">Avg: {stats.weeklyAverage.exercise} min</div>
            </div>
          </div>
        </div>
      )}

      <section className="panel">
        <h3>Upcoming Appointments</h3>
        {upcomingAppointments.length === 0 && (
          <p className="muted">No upcoming appointments.</p>
        )}
        {upcomingAppointments.map((appt) => (
          <div key={appt._id} className="appt-card">
            <div className="appt-header">
              <strong>
                Dr. {appt.doctorId?.firstName} {appt.doctorId?.lastName}
              </strong>
              {appt.doctorId?.specialization && (
                <span className="spec">{appt.doctorId.specialization}</span>
              )}
            </div>
            <div className="appt-details">
              <div className="appt-date">
                📅 {new Date(appt.date).toLocaleDateString()} at {appt.time}
              </div>
              <div className="appt-reason">{appt.reason}</div>
              <span className={`status status-${appt.status}`}>{appt.status}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <h3>Recent Activity</h3>
        {recentRecords.length === 0 && (
          <p className="muted">No records yet. Start tracking your health above!</p>
        )}
        <div className="records-list">
          {recentRecords.map((record) => (
            <RecordItem key={record._id} record={record} />
          ))}
        </div>
      </section>
    </div>
  );
}
