const { Router } = require('express');
const v1 = require('./v1');
const healthRoutes = require('./health.routes');

const router = Router();

router.use('/v1', v1);
router.use('/health', healthRoutes);

module.exports = router;
