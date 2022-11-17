const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
})

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;