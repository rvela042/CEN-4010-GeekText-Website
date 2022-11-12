const Comment = require('../db/models/bookComment');
// const Highest = require('../db/models/bookComment');
// const Average = require('../db/models/bookComment');
const httpResponse = require('../utility/backendShell');


// Post data
const create = async (req, res) => {

    try{
        const {title, Comments, User, CreateComment, Rating, Datestamp} = req.body;
        const fields = {
            title,
            Comments,
            User,
            CreateComment,
            Rating,
            Datestamp
        }

        const userComment = await Comment.create(fields);

        console.log('Sending...')
        console.log(userComment)

        httpResponse.successResponse(res, 'Saved Successfully')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());

    }

}

// Get data
const read = async (req, res) => {

    try{
        const userComment = await Comment.find({CreateComment, Rating, Datestamp});

        httpResponse.successResponse(res, userComment);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

// Get list of ratings and comments by highest rating
const highestRating = async (req, res) => {

    try {
        const listByHighest = await [Comment.find({CreateComment, Rating, Datestamp})];
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

        const averageRating = await [Comment.find({title, Rating})];
        const computeAverage = averageRating(Rating).reduce((a, b) => a + b, 0) / averageRating.length;
        
        httpResponse.successResponse(res, computeAverage);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}


module.exports = {create, read, highestRating, averageRating};