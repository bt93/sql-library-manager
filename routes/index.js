module.exports = {
    getHomePage: (req, res) => {
        // Grabs all books in database and displays them through the pug template
        (async () => {
            const pageSize = 10;
            const totalPages = await Book.count() / pageSize;
            const currentPage = await req.query.page - 1;
            const offset = currentPage * pageSize;
            const limit = offset + pageSize;

            const books = await Book.findAll({offset: offset, limit: limit});
            const booksPerPage = await books;
            
            if (booksPerPage.length > 0) {
                res.render('index', {
                    title: "Books", 
                    books: books,
                    totalPages: totalPages,
                    currentPage: currentPage
                });
            } else {
                res.render('page-not-found', {title: 'Page Not Found'});
            }
            
        })();
    }
}