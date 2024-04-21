// Import necessary modules
const express = require('express');
const router = express.Router();

// Import Room model
const Room = require('../models/Room');

// Define routes
router.get('/book-room', async (req, res) => {
    try {
        // Fetch room bookings data from the database
        const bookings = await Room.find({});
        // Render the room booking form and pass the bookings data
        res.render('bookRoom', { bookings });
    } catch (error) {
        console.error('Error fetching room bookings:', error);
        res.status(500).send('Error fetching room bookings');
    }
});

router.post('/book-room', async (req, res) => {
    try {
        // Process the booking request
        const { roomNumber, date, duration } = req.body;
        // Create a new room booking record
        const newBooking = await Room.create({ roomNumber, date, duration });
        // Redirect to a confirmation page or display a success message
        res.render('roomBookingSuccess');
    } catch (error) {
        console.error('Error booking room:', error);
        res.status(500).send('Error booking room');
    }
});

module.exports = router;
