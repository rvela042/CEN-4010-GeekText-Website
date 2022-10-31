const mongoose = require("mongoose");

// Creating schema
const commentSchema = new mongoose.Schema({
   
    User: String,
    Comment: String,
    Rating: String,
    Date: String

});

const bookCommentSchema = new mongoose.Schema({

    Title: String,
    Comments: [commentSchema]

})

const listOfRatingSchema = new mongoose.Schema({
   
    sortByHighest: [bookCommentSchema]

})

const averageRatingSchema = new mongoose.Schema ({
    
    sortByAverage: [bookCommentSchema]

})

// Creating models
const Comment = mongoose.model('Comments', bookCommentSchema);
const Highest = mongoose.model('highest rating', listOfRatingSchema);
const Average = mongoose.model('average rating', averageRatingSchema);

// Exporting models
module.exports = {

    Comment, Highest, Average

}