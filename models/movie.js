const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;