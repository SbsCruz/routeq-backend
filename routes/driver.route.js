const express = require('express');
const { createDriver, getDrivers, getDriverProfile,
  updateDriverProfile,
  getCarInfo,
  updateCarInfo,
  getDriverRoutes,
  getDriverAddress,
  updateDriverAddress, } = require('../controllers/driver.controller');

const router = express.Router();

router.post('/', createDriver);
router.get('/', getDrivers);
router.get("/:id/profile", getDriverProfile);
router.put("/:id", updateDriverProfile);
router.get("/:id/car", getCarInfo);
router.get("/:id/routes", getDriverRoutes);


module.exports = router;
