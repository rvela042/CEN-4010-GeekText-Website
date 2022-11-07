const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    yearpublished: {
        type: Number,
        required: true
    },
    soldcopies: {
        type: Number,
        required: true
    }
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
