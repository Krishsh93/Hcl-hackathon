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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/v1/patient/records', { 
        type, 
        value: Number(value), 
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
            required 
          />
          <span className="unit-label">{units[type]}</span>
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

  const loadDashboard = async () => {
    try {
      const { data } = await api.get('/v1/patient/dashboard');
      setStats(data?.stats || null);
      const records = data?.recentRecords || data?.records || [];
      setRecentRecords(Array.isArray(records) ? records : []);
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
