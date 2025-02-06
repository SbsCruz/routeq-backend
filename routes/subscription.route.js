const express = require('express');
const { createSubscription, getSubscriptions, getUsersByRoute } = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/', createSubscription);
router.get('/', getSubscriptions);
router.get('/route/:routeId', getUsersByRoute);


module.exports = router;
