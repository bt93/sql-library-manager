const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'library.db'
});

const db = {
    sequelize,
    Sequelize,
    models: {}
};

db.models.Book = require('./models/Book')(sequelize);
module.exports = db;