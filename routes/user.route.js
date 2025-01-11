const express = require('express');
const { getAllUsers, 
  createUser, 
  getUserProfile,
  updateUserProfile } = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get("/:id/profile", getUserProfile);
router.put("/:id", updateUserProfile);

module.exports = router;
