const { Router } = require('express');
const { getDashboard, getPatients, getPatientDetails } = require('../../controllers/doctor.controller');
const authMiddleware = require('../../middlewares/auth');
const roleCheck = require('../../middlewares/rbac');

const router = Router();

// All routes require authentication and doctor role
router.use(authMiddleware);
router.use(roleCheck('doctor'));

router.get('/dashboard', getDashboard);
router.get('/patients', getPatients);
router.get('/patients/:patientId', getPatientDetails);

module.exports = router;
