const express = require('express');
const cors = require('cors');
const app = express();
const bookRouter = require('./app/routes/book.route.js');
const readerRouter = require('./app/routes/reader.route.js');
const employeeRouter = require('./app/routes/employee.route.js');
const trackRouter = require('./app/routes/track.route.js');
const publisherRouter = require('./app/routes/publisher.route.js');
const authRouter = require('./app/routes/auth.route.js');
const cartRouter = require('./app/routes/cart.route.js');

const MongoDB = require('./app/utils/mongodb.util.js');
const ApiError = require('./app/api-error.js');

app.use(
    cors({
        origin: ['http://localhost:3001', 'https://liwenhou643.github.io'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
        credentials: true, // Allow credentials (cookies, etc.)
    })
);

app.use(express.json());
app.use('/api/books', bookRouter);
app.use('/api/readers', readerRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/publishers', publisherRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Ung dung quan ly muon sach.' });
});

module.exports = app;
