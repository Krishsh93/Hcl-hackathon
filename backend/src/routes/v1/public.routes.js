const { Router } = require('express');
const User = require('../../models/User');

const router = Router();

// Get all doctors (public)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('firstName lastName specialization email')
      .sort({ firstName: 1 });

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
});

module.exports = router;
