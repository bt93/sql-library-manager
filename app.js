const db = require('./db');
const { Book } = db.models;

(async () => {
    await db.sequelize.sync({});
    
    try {
        const books = await Book.findAll();
        console.log(books.map(book => book.toJSON()));
    } catch (error) {
        throw error;
    }
})();