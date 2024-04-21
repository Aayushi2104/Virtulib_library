// Room.js (in models folder)

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
