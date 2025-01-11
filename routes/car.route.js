const express = require('express');
const { createCar, getCars } = require('../controllers/car.controller');

const router = express.Router();

router.post('/', createCar);
router.get('/', getCars);

module.exports = router;
