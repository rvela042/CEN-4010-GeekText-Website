const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    author: {type: String, required: true},
    country: {type: String, required: true},
    imageLink: {type: String, required: true},
    language: {type: String, required: true},
    link: {type: String, required: true},
    pages: {type: Number, required: true},
    title: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    ratingCount: {type: Number, required: true},
    overview: {type: String, required: false}

})

const book = mongoose.model("book", bookSchema);

module.exports = book;