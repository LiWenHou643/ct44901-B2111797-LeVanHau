const express = require('express');
const books = require('../controllers/book.controller');

const router = express.Router();

router.route('/').get(books.findAllPublishers);

module.exports = router;
