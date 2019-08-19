module.exports = {
    getHomePage: (req, res) => {
        // Grabs all books in database and displays them through the pug template
        (async () => {
            const books = await Book.findAll();
            
            res.render('index', {title: "Books", books: books});
        })();
    }
}