const express = require('express');
const { createSubscription, getSubscriptions } = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/', createSubscription);
router.get('/', getSubscriptions);


module.exports = router;
