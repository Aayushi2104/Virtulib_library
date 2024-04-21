// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');

// Import the Book model
const Book = require('./models/book'); // Corrected the file name to 'Book'
const roomRoutes = require('./routes/roomRoutes')

// Create Express application
const app = express();

// Set up view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB (replace 'library' with your database name)
mongoose.connect('mongodb://127.0.0.1:27017/librarydb') 
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define DELETE route for deleting a book
app.delete('/delete-book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).send('Book deleted successfully');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

// Import routes (controllers)
const bookController = require('./controllers/bookController');
const roomController = require('./controllers/roomController');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Added import for dashboardRoutes

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Use routes (controllers)
app.use('/', bookController);
app.use('/', roomController);
app.use('/dashboard', dashboardRoutes); 
app.use('/book-room', roomRoutes);
// Used dashboardRoutes middleware
app.use('/user', userRoutes); // Added userRoutes middleware
app.get('/logout', (req, res) => {
    // Destroy session to log out user
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error logging out');
        } else {
            // Redirect user to index page after logout
            res.redirect('/');
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
