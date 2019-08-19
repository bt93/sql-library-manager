// Sets up express
const express = require('express');
const app = express();
const port = 3000;

// Require body-parser for form parsing
const bodyParser = require('body-parser');

// Grabs all files needed for the routes
const { getHomePage, searchBook } = require('./routes/index');
const { getNewBook, getBookDetail, postNewBook, postBookDetail, postDeleteBook } = require('./routes/books');

// Sets up sequelize
const db = require('./db');
const { Book } = db.models;
const { Op } = db.Sequelize;
global.Book = Book;
global.Op = Op;

// Syncs sequelize with the app
(async() => await db.sequelize.sync())();

// Sets up middleware
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route handlers
app.get('/', (req, res) => res.redirect('/books?page=1'));
app.get('/books?', getHomePage);
app.get('/books/new', getNewBook);
app.get('/books/:id', getBookDetail);
app.get('/search?', searchBook);
app.post('/books/new', postNewBook);
app.post('/books/:id', postBookDetail);
app.post('/books/:id/delete', postDeleteBook);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.message, err.status);

    res.status(err.status);
    res.render('page-not-found', {title: "Not Found", err: err});
});

// Listens to the port
app.listen(port, () => console.log(`App listening at port ${port}`));