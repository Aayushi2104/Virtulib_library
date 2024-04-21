// roomRoutes.js
// roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); // Import the Room model

// Route to render the edit room booking page
router.get('/edit/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        // Fetch the booking details from the database
        const booking = await Room.findById(bookingId);
        if (!booking) {
            return res.status(404).send('Booking not found');
        }
        // Render the edit page with the booking details
        res.render('editRoom', { booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).send('Error fetching booking');
    }
});
router.post('/update/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        // Retrieve the updated booking data from the request body
        const { roomNumber, date, duration } = req.body;
        // Find the booking by ID and update its details
        await Room.findByIdAndUpdate(bookingId, { roomNumber, date, duration });
        // Redirect to the room bookings page or display a success message
        res.redirect('/book-room');
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).send('Error updating booking');
    }
});

router.delete('/delete/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        // Find and delete the booking from the database
        await Room.findByIdAndDelete(bookingId);
        // Send a success response
        res.status(200).send('Booking deleted successfully');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Error deleting booking');
    }
});
module.exports = router;
