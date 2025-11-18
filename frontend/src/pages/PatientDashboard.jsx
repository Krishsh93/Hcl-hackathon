import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPatientDashboard, createPatientRecord, getNotifications } from '../services/apiService';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    type: 'sleep',
    value: '',
    unit: 'hours'
  });

  useEffect(() => {
    fetchDashboard();
    fetchNotifications();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getPatientDashboard();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatientRecord(formData);
      setShowForm(false);
      setFormData({ type: 'sleep', value: '', unit: 'hours' });
      fetchDashboard();
    } catch (error) {
      console.error('Error creating record:', error);
      alert('Failed to add record');
    }
  };

  const getUnitForType = (type) => {
    if (type === 'sleep') return 'hours';
    if (type === 'water') return 'glasses';
    if (type === 'exercise') return 'minutes';
    return 'units';
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Patient Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.firstName}</span>
            <button
              onClick={() => navigate('/patient/appointments')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Appointments
            </button>
            <button
              onClick={() => navigate('/patient/notifications')}
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
        {/* Today's Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Sleep Today</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.today?.sleep || 0} hrs</p>
            <p className="text-sm text-gray-500 mt-2">Weekly avg: {stats?.weeklyAverage?.sleep || 0} hrs</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Water Intake Today</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.today?.water || 0} glasses</p>
            <p className="text-sm text-gray-500 mt-2">Weekly avg: {stats?.weeklyAverage?.water || 0} glasses</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Exercise Today</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.today?.exercise || 0} mins</p>
            <p className="text-sm text-gray-500 mt-2">Weekly avg: {stats?.weeklyAverage?.exercise || 0} mins</p>
          </div>
        </div>

        {/* Add Record Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            {showForm ? 'Cancel' : '+ Add Health Record'}
          </button>
        </div>

        {/* Add Record Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Add Health Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    type: e.target.value, 
                    unit: getUnitForType(e.target.value)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sleep">Sleep</option>
                  <option value="water">Water Intake</option>
                  <option value="exercise">Exercise</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Value ({formData.unit})
                </label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${formData.type} in ${formData.unit}`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Add Record
              </button>
            </form>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/patient/appointments')}
                className="w-full text-left px-4 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                📅 View Appointments
              </button>
              <button
                onClick={() => navigate('/patient/appointments/new')}
                className="w-full text-left px-4 py-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
              >
                ➕ Book New Appointment
              </button>
              <button
                onClick={() => navigate('/patient/records')}
                className="w-full text-left px-4 py-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
              >
                📊 View All Records
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Health Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>💧 Drink 8 glasses of water daily</li>
              <li>😴 Get 7-8 hours of sleep</li>
              <li>🏃 Exercise for 30 minutes daily</li>
              <li>🥗 Eat a balanced diet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
