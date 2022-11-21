const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        title: { type: String, required: true },
        comment: { type: String, required: false },
        rating: { type: Number, required: false },
    },
    { timestamps: true }
);

// Creating models
const bookComments = mongoose.model('comment', commentSchema);

module.exports = bookComments; 