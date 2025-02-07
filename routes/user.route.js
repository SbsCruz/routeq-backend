const express = require('express');
const { getAllUsers,
  createUser,
  getUserProfile,
  updateUserProfile,
  getUserSubscriptions } = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get("/:id/profile", getUserProfile);
router.put("/:id", updateUserProfile);
router.get('/:id/subscriptions', getUserSubscriptions);

module.exports = router;
