// Requiring module
const mongoose = require("mongoose");

// Rating Modal Schema
const ratingSchema = new mongoose.Schema({
    name: String,
    stars: Number,
    datestamp: Number
});

// Comment Modal Schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    required: 'This comment needs text.',
    datestamp: Number
})

// List Modal Schema
const listSchema = new mongoose.Schema({
    highestRating: Array
})

// Average Modal Schema
const averageSchema = new mongoose.Schema ({
    bookName: String,
    avgRating: Number
})

// Creating model objects
const Rating = mongoose.model('ratings', ratingSchema);
const Comment = mongoose.model('comments', commentSchema);
const Highest = mongoose.model('highest rating', listSchema);
const Average = mongoose.model('average rating', averageSchema);

// Exporting our model objects
module.exports = {
    Rating, Comment, Highest, Average
}