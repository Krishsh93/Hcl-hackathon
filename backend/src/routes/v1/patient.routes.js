const { Router } = require('express');
const { getRecords, createRecord, getDashboard } = require('../../controllers/patient.controller');
const authMiddleware = require('../../middlewares/auth');
const roleCheck = require('../../middlewares/rbac');

const router = Router();

// All routes require authentication and patient role
router.use(authMiddleware);
router.use(roleCheck('patient'));

router.get('/dashboard', getDashboard);
router.get('/records', getRecords);
router.post('/records', createRecord);

module.exports = router;
