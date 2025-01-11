const express = require('express');
const { createRoute, getRoutes } = require('../controllers/route.controller');

const router = express.Router();

router.post('/', createRoute);
router.get('/', getRoutes);

module.exports = router;
