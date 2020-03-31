const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    ratings: {
        type: String
    },
    price: {
        type: String,
        required: true
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;