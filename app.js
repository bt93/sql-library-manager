// Sets up express
const express = require('express');
const app = express();
const port = 3000;

// Require body-parser for form parsing
const bodyParser = require('body-parser');

// Grabs all files needed for the routes
const { getHomePage } = require('./routes/index');
const { getNewBook, postNewBook } = require('./routes/books');

// Sets up sequelize
const db = require('./db');
const { Book } = db.models;
global.Book = Book;

// Syncs sequelize with the app
(async() => await db.sequelize.sync())();

// Sets up middleware
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route handlers
app.get('/', (req, res) => res.redirect('/books'));
app.get('/books', getHomePage);
app.get('/books/new', getNewBook);
app.post('/books/new', postNewBook);

// Listens to the port
app.listen(port, () => console.log(`App listening at port ${port}`));