module.exports = {
    getNewBook: (req, res) => {
        res.render('new-book', {title: 'New Book'});
    },

    postNewBook: (req, res) => {
        console.log(req.body);

        res.redirect('/books/new');
    }
}