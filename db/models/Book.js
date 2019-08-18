const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Title".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Title".'
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Author".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Author".'
                }
            }
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Genre".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Genre".'
                }
            }
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Year".'
                },
                isInt: {
                    msg: 'Please provide a value for "year"'
                },
                len: {
                    args: [4],
                    msg: 'Please provide a valid "year" with 4 digits'
                }
            }
        }
    }, {
        sequelize
    });

    return Book;
}