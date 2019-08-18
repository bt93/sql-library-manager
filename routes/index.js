module.exports = {
    getHomePage: (req, res) => {
        res.send('test');
        
        (async () => {
            const books = await Book.findAll();
            console.log(books.map(book => book.toJSON()));
        })();
    }
}