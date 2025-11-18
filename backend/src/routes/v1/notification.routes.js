const { Router } = require('express');
const { getNotifications, markAsRead, markAllAsRead, createNotification } = require('../../controllers/notification.controller');
const authMiddleware = require('../../middlewares/auth');

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getNotifications);
router.post('/', createNotification);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);

module.exports = router;
