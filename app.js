// Sets up express
const express = require('express');
const app = express();
const port = 3000;

// Grabs all files needed for the routes
const { getHomePage } = require('./routes/index');

// Sets up sequelize
const db = require('./db');
const { Book } = db.models;
global.Book = Book;

// Syncs sequelize with the app
(async() => await db.sequelize.sync())();

// Sets up the pug view engine and stylesheet
app.set('view engine', 'pug');
app.use(express.static('public'));

// Route handlers
app.get('/', (req, res) => res.redirect('/books'));
app.get('/books', getHomePage);

// Listens to the port
app.listen(port, () => console.log(`App listening at port ${port}`));