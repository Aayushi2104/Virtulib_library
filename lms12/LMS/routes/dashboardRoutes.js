// dashboardRoutes.js

const express = require('express');
const router = express.Router();

// Import the controller for the dashboard
const dashboardController = require('../controllers/dashboardController');

// Define a route to render the dashboard view
router.get('/', dashboardController.renderDashboard);

// Define a route to handle book search
router.get('/search', dashboardController.searchBooks);

module.exports = router;
