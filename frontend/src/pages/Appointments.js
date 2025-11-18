import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/dashboard.css';

function AppointmentItem({ appt, onStatusChange, userRole }) {
  const handleStatus = async (status) => {
    try {
      await api.patch(`/v1/appointments/${appt._id}/status`, { status });
      onStatusChange();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const doctorName = appt.doctorId 
    ? `Dr. ${appt.doctorId.firstName} ${appt.doctorId.lastName}` 
    : 'Doctor';
  const patientName = appt.patientId 
    ? `${appt.patientId.firstName} ${appt.patientId.lastName}` 
    : 'Patient';
  const displayName = userRole === 'patient' ? doctorName : patientName;

  return (
    <div className="appt">
      <div className="appt-info">
        <strong>{displayName}</strong>
        {appt.doctorId?.specialization && <span className="spec">{appt.doctorId.specialization}</span>}
        <div className="muted">{new Date(appt.date).toLocaleDateString()} at {appt.time}</div>
        <div className="reason">{appt.reason}</div>
        {appt.notes && <div className="muted notes">{appt.notes}</div>}
      </div>
      <div className="appt-actions">
        <span className={`status status-${appt.status}`}>{appt.status}</span>
        {userRole === 'doctor' && appt.status === 'scheduled' && (
          <>
            <button onClick={() => handleStatus('completed')} className="btn-small">Complete</button>
            <button onClick={() => handleStatus('cancelled')} className="btn-small btn-light">Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

function CreateAppointmentForm({ onCreated }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch doctors list
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get('/v1/public/doctors');
        const list = data?.doctors || data?.data || data || [];
        setDoctors(Array.isArray(list) ? list : []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/v1/appointments', { doctorId, date, time, reason, notes });
      setMessage('Appointment created successfully!');
      setDoctorId('');
      setDate('');
      setTime('');
      setReason('');
      setNotes('');
      onCreated();
    } catch (err) {
      const text = err?.response?.data?.message || err.message || 'Failed to create appointment';
      setMessage(text);
    }
  };

  return (
    <div className="create-appt-form">
      <h3>Book New Appointment</h3>
      <form onSubmit={handleSubmit}>
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
          <option value="">Select a doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.firstName} {doc.lastName} - {doc.specialization}
            </option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" required />
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for visit" required />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes (optional)" rows="3" />
        <button className="btn" type="submit">Book Appointment</button>
      </form>
      {message && <p className="msg">{message}</p>}
    </div>
  );
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [userRole, setUserRole] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/v1/appointments');
      // API might return data or {data: ...}
      const list = data?.appointments || data?.data || data || [];
      // Ensure it's an array
      setAppointments(Array.isArray(list) ? list : []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setAppointments([]);
    }
  };

  const fetchUserRole = async () => {
    try {
      const { data } = await api.get('/v1/auth/me');
      const role = data?.user?.role || data?.role || 'patient';
      setUserRole(role);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  useEffect(() => { 
    fetchUserRole();
    load(); 
  }, []);

  return (
    <div className="container dashboard">
      <h2>Appointments</h2>
      
      {userRole === 'patient' && <CreateAppointmentForm onCreated={load} />}
      
      <div className="panel">
        <h3>{userRole === 'patient' ? 'My Appointments' : 'Patient Appointments'}</h3>
        {appointments.length === 0 && <p className="muted">No appointments found.</p>}
        {appointments.map((a) => (
          <AppointmentItem key={a._id || a.id} appt={a} onStatusChange={load} userRole={userRole} />
        ))}
      </div>
    </div>
  );
}
