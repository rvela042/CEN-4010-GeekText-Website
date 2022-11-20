const mongoose = require("mongoose");

// Creating schema
const commentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        bookId: { type: String, required: true },
        comment: { type: String, required: false },
        rating: { type: Number, required: false },
    },
    // This will add CreateAt and UpdatedAt
    // https://mongoosejs.com/docs/timestamps.html
    { timestamps: true }
);


// Creating models
const comments = mongoose.model('Comments', commentSchema);
// const Highest = mongoose.model('highest rating', listOfRatingSchema);
// const Average = mongoose.model('average rating', averageRatingSchema);

// Exporting models
module.exports = comments; 