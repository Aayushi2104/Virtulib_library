const User = require('../models/User');
const Book = require('../models/book'); // Import the Book model

exports.renderDashboard = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        const username = user.username;

        // Fetch books from the database
        const books = await Book.find();

        // Render the dashboard view and pass the username and books data
        res.render('dashboard', { username, books });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).send('Error rendering dashboard');
    }
};

// dashboardController.js

exports.searchBooks = async (req, res) => {
    try {
        const query = req.query.q;
        const books = await Book.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { author: { $regex: query, $options: 'i' } }] });
        if (books.length > 0) {
            // If books are found, render the search results view
            res.render('search-results', { books });
        } else {
            // If no books are found, render a no-results view
            res.render('no-results', { message: 'No results found' });
        }
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).send('Error searching books');
    }
};

exports.viewBookContent = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.render('view-book', { book });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Error fetching book');
    }
};
// bookController.js



exports.renderAddBookPage = async (req, res) => {
    try {
        // Fetch books from the database
        const books = await Book.find();

        // Render the add-book view and pass the books data
        res.render('add-book', { books });
    } catch (error) {
        console.error('Error rendering add-book page:', error);
        res.status(500).send('Error rendering add-book page');
    }
};
