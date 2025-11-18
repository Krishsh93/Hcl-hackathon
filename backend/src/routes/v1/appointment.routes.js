const { Router } = require('express');
const { getAppointments, createAppointment, updateAppointmentStatus } = require('../../controllers/appointment.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getAppointments);
router.post('/', createAppointment);
router.patch('/:id/status', updateAppointmentStatus);

module.exports = router;
