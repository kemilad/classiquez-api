const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    musician: {
        type: String,
        required: true
    },
    lyricist: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;