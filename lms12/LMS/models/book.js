const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String, // Assuming content is a string
        // Set required to false to make it optional
        required: false
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
