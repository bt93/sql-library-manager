const express = require('express');
const app = express();
const port = 3000;

const { getHomePage } = require('./routes/index');

const db = require('./db');
const { Book } = db.models;
global.Book = Book;


(async() => {
    await db.sequelize.sync();
})();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', getHomePage);

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
})