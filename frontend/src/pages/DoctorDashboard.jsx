import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getDoctorDashboard, getDoctorPatients, getNotifications } from '../services/apiService';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [patients, setPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchPatients();
    fetchNotifications();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDoctorDashboard();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await getDoctorPatients();
      setPatients(response.data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications({ read: false });
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Dr. {user?.firstName} {user?.lastName}</span>
            <span className="text-sm text-gray-500">({user?.specialization})</span>
            <button
              onClick={() => navigate('/doctor/appointments')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate('/doctor/notifications')}
              className="relative bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Notifications
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Patients</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalPatients || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Today's Appointments</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.todayAppointments || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Scheduled Appointments</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats?.appointmentsByStatus?.scheduled || 0}
            </p>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
          {stats?.todayAppointments === 0 ? (
            <p className="text-gray-500">No appointments scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {/* Appointments will be shown here */}
              <p className="text-gray-600">View all appointments in the Appointments tab</p>
            </div>
          )}
        </div>

        {/* Patients List */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Patients</h2>
            <button
              onClick={() => navigate('/doctor/patients')}
              className="text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>
          
          {patients.length === 0 ? (
            <p className="text-gray-500">No patients yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients.slice(0, 5).map((patient) => (
                    <tr key={patient._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {patient.firstName} {patient.lastName}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{patient.email}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.phone || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/doctor/patients/${patient._id}`)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
