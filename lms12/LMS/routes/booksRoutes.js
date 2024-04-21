// routes/booksRoutes.js

const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const bookController = require('../controllers/dashboardController');

// Route to view a specific book's content
// router.get('/book/:id', bookController.viewBookContent);
// router.get('/book/:id', async (req, res) => {
//     try {
//         const bookId = req.params.id;
//         const book = await Book.findById(bookId);
//         if (!book) {
//             return res.status(404).send('Book not found');
//         }
//         res.render('view-book', { book }); // Render the view-book template with the book data
//     } catch (error) {
//         console.error('Error fetching book:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
router.post('/add-book', async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const newBook = new Book({ title, author, content });
        await newBook.save();
        res.redirect('/'); // Redirect to the dashboard route upon successful addition of the book
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/search', bookController.searchBooks);
// Route to display search results
module.exports = router;