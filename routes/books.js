module.exports = {
    // Renders new book form
    getNewBook: (req, res) => {
        res.render('new-book', {title: 'New Book'});
    },

    // Post Details on the new book form and catches errors
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
                    bookTitle: title,
                    author: author,
                    genre: genre,
                    year: year
                });
            }
        })();
    },

    // Renders pages that already exsist
    getBookDetail: (req, res) => {

        (async () =>{
            const book = await Book.findOne({
                where: {
                    id: req.params.id
                }
            });
            
            // If id exsist, render page and catch if it doesn't
            try {
                res.render('book-detail', {
                    title: book.dataValues.title,
                    data: book.dataValues
                });
            } catch (error) {
                res.render('page-not-found', {title: 'Not Found'});
            }
        })();
    },

    // Updates exsisting book and catches errors
    postBookDetail: (req, res) => {

        (async () =>{
            const id = req.params.id
            const title = req.body.title;
            const author = req.body.author;
            const genre = req.body.genre;
            const year = req.body.year;

            try {
                const book = await Book.update({
                    title: title,
                    author: author,
                    genre: genre,
                    year: year
                }, {
                    where: {id: id}
                });
    
                res.redirect('/books');
            } catch (error) {
                res.render('form-error-update', {
                    title: 'Update Book', 
                    errors: error.errors, 
                    bookTitle: title,
                    author: author,
                    genre: genre,
                    year: year
                });
            }
        })();
    },

    // Deletes the corresponding book
    postDeleteBook: (req, res) => {
        
        (async () => {
            const id = req.params.id

            const book = await Book.destroy({
                where: {
                    id: id
                }
            });

            res.redirect('/books');
        })();
    }
}