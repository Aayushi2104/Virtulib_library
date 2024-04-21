// routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
    try {
        const query = req.query.q;
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        });
        res.render('searchResults', { books });
    } catch (error) {
        console.error('Error searching for books:', error);
        res.status(500).send('Error searching for books');
    }
});
router.get('/search-results', async (req, res) => {
    try {
        const query = req.query.q;
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        });
        res.render('searchResults', { books });
    } catch (error) {
        console.error('Error searching for books:', error);
        res.status(500).send('Error searching for books');
    }
});


module.exports = router;
