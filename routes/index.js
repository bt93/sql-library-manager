module.exports = {
    getHomePage: (req, res) => {
        // Grabs all books in database and displays them through the pug template
        (async () => {
            const itemsPerPage = 10;
            const totalPages = await Book.count() / itemsPerPage;
            const currentPage = await req.query.page;
            const offset = (currentPage * itemsPerPage) - itemsPerPage;

            const books = await Book.findAll({offset: offset, limit: itemsPerPage});
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