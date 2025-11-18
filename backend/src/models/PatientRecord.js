const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['sleep', 'water', 'exercise'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    // sleep: hours, water: glasses, exercise: minutes
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Index for faster queries
patientRecordSchema.index({ userId: 1, date: -1 });
patientRecordSchema.index({ userId: 1, type: 1, date: -1 });

module.exports = mongoose.model('PatientRecord', patientRecordSchema);
