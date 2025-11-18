const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const User = require('../models/User');

// Get appointments
const getAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let query = {};
    if (userRole === 'patient') {
      query.patientId = userId;
    } else if (userRole === 'doctor') {
      query.doctorId = userId;
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'firstName lastName email phone')
      .populate('doctorId', 'firstName lastName specialization')
      .sort({ date: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Create appointment
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason, notes } = req.body;
    const patientId = req.user._id;

    if (!doctorId || !date || !time || !reason) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Verify doctor exists
    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      reason,
      notes
    });

    await appointment.save();

    // Create notification for doctor
    await Notification.create({
      userId: doctorId,
      type: 'appointment',
      title: 'New Appointment Request',
      message: `New appointment scheduled for ${new Date(date).toLocaleDateString()} at ${time}`,
      relatedId: appointment._id
    });

    // Create notification for patient
    await Notification.create({
      userId: patientId,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: `Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} is scheduled for ${new Date(date).toLocaleDateString()} at ${time}`,
      relatedId: appointment._id
    });

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Failed to create appointment' });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has permission
    if (req.user.role === 'doctor' && appointment.doctorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = status;
    await appointment.save();

    // Create notification
    const notifyUserId = req.user.role === 'doctor' ? appointment.patientId : appointment.doctorId;
    await Notification.create({
      userId: notifyUserId,
      type: 'appointment',
      title: 'Appointment Status Updated',
      message: `Your appointment has been ${status}`,
      relatedId: appointment._id
    });

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Failed to update appointment' });
  }
};

module.exports = { getAppointments, createAppointment, updateAppointmentStatus };
