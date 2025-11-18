const User = require('../models/User');
const Appointment = require('../models/Appointment');
const PatientRecord = require('../models/PatientRecord');

// Get doctor's dashboard data
const getDashboard = async (req, res) => {
  try {
    const doctorId = req.user._id;

    // Get today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.find({
      doctorId,
      date: { $gte: today, $lt: tomorrow }
    }).populate('patientId', 'firstName lastName');

    // Get upcoming appointments (next 7 days)
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcomingAppointments = await Appointment.find({
      doctorId,
      date: { $gte: today, $lte: nextWeek },
      status: { $in: ['scheduled', 'pending'] }
    })
      .populate('patientId', 'firstName lastName')
      .sort({ date: 1, time: 1 })
      .limit(10);

    // Get all appointments count by status
    const appointmentStats = await Appointment.aggregate([
      { $match: { doctorId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get unique patients count
    const uniquePatients = await Appointment.distinct('patientId', { doctorId });

    res.json({
      success: true,
      stats: {
        totalPatients: uniquePatients.length,
        todayAppointments: todayAppointments.length,
        upcomingAppointments: upcomingAppointments.length,
        appointmentsByStatus: appointmentStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      },
      todayAppointments,
      upcomingAppointments
    });
  } catch (error) {
    console.error('Get doctor dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};

// Get all patients
const getPatients = async (req, res) => {
  try {
    const doctorId = req.user._id;

    // Get unique patient IDs from appointments
    const patientIds = await Appointment.distinct('patientId', { doctorId });

    // Get patient details
    const patients = await User.find({
      _id: { $in: patientIds },
      role: 'patient'
    }).select('-password');

    res.json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
};

// Get patient details with records
const getPatientDetails = async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctorId = req.user._id;

    // Verify doctor has appointment with this patient
    const hasAppointment = await Appointment.findOne({
      doctorId,
      patientId
    });

    if (!hasAppointment) {
      return res.status(403).json({ message: 'No access to this patient' });
    }

    // Get patient info
    const patient = await User.findOne({
      _id: patientId,
      role: 'patient'
    }).select('-password');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Get patient records
    const records = await PatientRecord.find({ userId: patientId })
      .sort({ date: -1 })
      .limit(30);

    // Get patient appointments
    const appointments = await Appointment.find({
      patientId,
      doctorId
    }).sort({ date: -1 });

    res.json({
      success: true,
      patient,
      records,
      appointments
    });
  } catch (error) {
    console.error('Get patient details error:', error);
    res.status(500).json({ message: 'Failed to fetch patient details' });
  }
};

module.exports = { getDashboard, getPatients, getPatientDetails };
