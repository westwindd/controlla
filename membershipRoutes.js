// routes/membershipRoutes.js
const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

// Define routes for membership operations
router.post('/', membershipController.addMembership);
router.get('/', membershipController.getMemberships);

module.exports = router;
