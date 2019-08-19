module.exports = {
    getHomePage: (req, res) => {
        // Grabs all books in database and displays them through the pug template
        (async () => {
            const itemsPerPage = 10;
            const totalPages = await Book.count() / itemsPerPage;
            const currentPage = await req.query.page;
            const offset = (currentPage * itemsPerPage) - itemsPerPage;
            let page = 0

            const books = await Book.findAll({offset: offset, limit: itemsPerPage});
            const booksPerPage = await books;
            
            if (booksPerPage.length > 0) {
                res.render('index', {
                    title: "Books", 
                    books: books,
                    totalPages: totalPages,
                    currentPage: parseInt(currentPage),
                    page: page
                });
            } else {
                res.render('page-not-found', {title: 'Page Not Found'});
            }
            
        })();
    },
    searchBook: (req, res) => {
        (async() => {
            const query = req.query.q

            if (query !== '') {
                const books = await Book.findAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: `%${query}%`
                                }
                            },
                            {
                                author: {
                                    [Op.like]: `%${query}%`
                                }
                            },
                            {
                                genre: {
                                    [Op.like]: `%${query}%`
                                }
                            },
                            {
                                year: {
                                    [Op.like]: `%${query}%`
                                }
                            }
                        ]
                    }
                      
                  });
                res.render('index', {
                    title: 'Books',
                    books: books
                })
            } else {
                res.render('page-not-found', {title: 'Not Found'})
            }
        })();
    }
}