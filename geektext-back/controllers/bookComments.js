const Comments = require('../db/models/bookComment');
// const Highest = require('../db/models/bookComment');
// const Average = require('../db/models/bookComment');
const httpResponse = require('../utility/backendShell');


// Post data
const create = async (req, res) => {

    try {
        const { userId, bookId, comment, rating } = req.body;
        const fields = {
            userId, bookId, comment, rating
        }

        //Defining unique document for the pair of userId and bookId
        Comments.collection.createIndex({ userId: 1, bookId: 1 }, { unique: true });
        // Creating new comment
        const userComment = await Comments.create(fields);

        console.log('Sending...')
        console.log(userComment)

        httpResponse.successResponse(res, 'Saved Successfully')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

// Get all comment
const read = async (req, res) => {
    try {
        // List all the comments
        const allComments = await Comments.find({});

        httpResponse.successResponse(res, allComments);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

// Delete all comments
const deleteAll = async (req, res) => {
    try {

        const comments = await Comments.collection.drop();

        httpResponse.successResponse(res, 'success');
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

// Get list of ratings and comments by highest rating
const highestRating = async (req, res) => {

    try {
        const listByHighest = await [Comment.find({ CreateComment, Rating, Datestamp })];
        listByHighest.reverse(Rating);

        httpResponse.successResponse(res, listByHighest);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

// Get average rating for a book
const averageRating = async (req, res) => {

    try {

        const averageRating = await [Comment.find({ title, Rating })];
        const computeAverage = averageRating(Rating).reduce((a, b) => a + b, 0) / averageRating.length;

        httpResponse.successResponse(res, computeAverage);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}


module.exports = { create, read, deleteAll, highestRating, averageRating };
