// const { find } = require('../db/models/bookComment');
const bookComments = require('../db/models/bookComment');
const httpResponse = require('../utility/backendShell');

// Method to create a comment and a rating
const createComment = async (req, res) => {
    try {
        const { username, title, comment, rating } = req.body;
        const fields = {
            username, 
            title, 
            comment, 
            rating
        }
        // Verify rating input is 1 through 5
        if(rating < 1 || rating > 5) {
       return httpResponse.failureResponse(res, 'Enter a rating from 1 to 5');
       } else {
        const userComment = await bookComments.create(fields);
        return httpResponse.successResponse(res, userComment);
       } 
    } catch (e) {
        return httpResponse.failureResponse(res, e.toString());
    }
}
// Method to read comments and ratings
const readComment = async (req, res) => {
    try {
        const allComments = await bookComments.find({});

       return httpResponse.successResponse(res, allComments);
    } catch (e) {
       return httpResponse.failureResponse(res, e.toString());
    }
}

// Method to sort comments by highest rating
const sortByHighestRating = async (req, res) => {
    try {
        // Sort ratings in descending order and store in highestRating
        const highestRating = await bookComments.find({}).sort({rating: -1});
    
        return httpResponse.successResponse(res, highestRating);
    } catch (e) {
       return httpResponse.failureResponse(res, e.toString());
    }
}

// Method to get average rating for a specified book
const displayAverageRating = async (req, res) => {
    try {
        // Takes an input for book title and stores all those book titles in findBookTitle
        const findBookTitle = await bookComments.find({title: req.body.title});

        // Add all the ratings for a book title and stores total in ratingsTotal
        const ratingsTotal = findBookTitle.reduce((accumulator, bookComment) => {
            return accumulator + bookComment.rating
        }, 0);

        // Divide ratingsTotal by length of findBookTitle
        const ratingsAverage = (ratingsTotal / findBookTitle.length).toPrecision(2);
       
       return httpResponse.successResponse(res, ratingsAverage);
    } catch (e) {
        return httpResponse.failureResponse(res, e.toString());
    }
}

module.exports = {createComment, readComment, sortByHighestRating, displayAverageRating}; 
