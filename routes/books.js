module.exports = {
    getNewBook: (req, res) => {
        res.render('new-book', {title: 'New Book'});
    },

    postNewBook: (req, res) => {
        (async () => {
            const title = req.body.title;
            const author = req.body.author;
            const genre = req.body.genre;
            const year = req.body.year;

            try {

                await Book.create({
                    title: title,
                    author: author,
                    genre: genre,
                    year: year
                });

                res.redirect('/books');
            } catch (error) {

                res.render('form-error', {
                    title: 'New Book', 
                    errors: error.errors, 
                    title: title,
                    author: author,
                    genre: genre,
                    year: year
                });
            }
        })();
    }
}