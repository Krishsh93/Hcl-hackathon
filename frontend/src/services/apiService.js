import api from './api';

// Auth APIs
export const register = (data) => api.post('/v1/auth/register', data);
export const login = (data) => api.post('/v1/auth/login', data);
export const getMe = () => api.get('/v1/auth/me');

// Patient APIs
export const getPatientDashboard = () => api.get('/v1/patient/dashboard');
export const getPatientRecords = (params) => api.get('/v1/patient/records', { params });
export const createPatientRecord = (data) => api.post('/v1/patient/records', data);

// Doctor APIs
export const getDoctorDashboard = () => api.get('/v1/doctor/dashboard');
export const getDoctorPatients = () => api.get('/v1/doctor/patients');
export const getPatientDetails = (patientId) => api.get(`/v1/doctor/patients/${patientId}`);

// Appointment APIs
export const getAppointments = () => api.get('/v1/appointments');
export const createAppointment = (data) => api.post('/v1/appointments', data);
export const updateAppointmentStatus = (id, status) => 
  api.patch(`/v1/appointments/${id}/status`, { status });

// Notification APIs
export const getNotifications = (params) => api.get('/v1/notifications', { params });
export const markNotificationAsRead = (id) => api.patch(`/v1/notifications/${id}/read`);
export const markAllNotificationsAsRead = () => api.patch('/v1/notifications/read-all');

// Public APIs
export const getDoctors = () => api.get('/v1/public/doctors');
