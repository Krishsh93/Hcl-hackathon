const PatientRecord = require('../models/PatientRecord');
const Notification = require('../models/Notification');
const Appointment = require('../models/Appointment');

// Get patient records
const getRecords = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    const userId = req.user._id;

    let query = { userId };

    if (type) {
      query.type = type;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await PatientRecord.find(query).sort({ date: -1 });

    res.json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
};

// Create patient record
const createRecord = async (req, res) => {
  try {
    const { type, value, unit, notes } = req.body;
    const userId = req.user._id;

    if (!type || !value || !unit) {
      return res.status(400).json({ message: 'Please provide type, value, and unit' });
    }

    if (!['sleep', 'water', 'exercise'].includes(type)) {
      return res.status(400).json({ message: 'Invalid record type' });
    }

    const record = new PatientRecord({
      userId,
      type,
      value,
      unit,
      notes
    });

    await record.save();

    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      record
    });
  } catch (error) {
    console.error('Create record error:', error);
    res.status(500).json({ message: 'Failed to create record' });
  }
};

// Get dashboard summary
const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's records
    const todayRecords = await PatientRecord.find({
      userId,
      date: { $gte: today }
    });

    // Get last 7 days records for trends
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weekRecords = await PatientRecord.find({
      userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: -1 });

    // Calculate stats
    const stats = {
      today: {
        sleep: todayRecords.find(r => r.type === 'sleep')?.value || 0,
        water: todayRecords.find(r => r.type === 'water')?.value || 0,
        exercise: todayRecords.find(r => r.type === 'exercise')?.value || 0
      },
      weeklyAverage: {
        sleep: 0,
        water: 0,
        exercise: 0
      }
    };

    // Calculate weekly averages
    ['sleep', 'water', 'exercise'].forEach(type => {
      const typeRecords = weekRecords.filter(r => r.type === type);
      if (typeRecords.length > 0) {
        const sum = typeRecords.reduce((acc, r) => acc + r.value, 0);
        stats.weeklyAverage[type] = Math.round(sum / typeRecords.length);
      }
    });

    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      patientId: userId,
      date: { $gte: today },
      status: { $in: ['scheduled', 'pending'] }
    })
      .populate('doctorId', 'firstName lastName specialization')
      .sort({ date: 1, time: 1 })
      .limit(5);

    // Get recent appointments
    const recentAppointments = await Appointment.find({
      patientId: userId,
      date: { $lt: today }
    })
      .populate('doctorId', 'firstName lastName specialization')
      .sort({ date: -1 })
      .limit(3);

    res.json({
      success: true,
      stats,
      recentRecords: weekRecords.slice(0, 10),
      upcomingAppointments,
      recentAppointments
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};

module.exports = { getRecords, createRecord, getDashboard };
