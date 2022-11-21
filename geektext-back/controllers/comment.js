const bookComments = require('../db/models/bookComment');
const httpResponse = require('../utility/backendShell');

const createComment = async (req, res) => {
    try {
        const { username, title, comment, rating } = req.body;
        const fields = {
            username, 
            title, 
            comment, 
            rating
        }

       const userComment = await bookComments.create(fields);

        httpResponse.successResponse(res, 'Saved Successfully')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

const readComment = async (req, res) => {
    try {
        const allComments = await bookComments.find({});

        httpResponse.successResponse(res, allComments);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

module.exports = {createComment, readComment}; 
