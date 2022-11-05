const Comment = require('../models/bookComment');
const httpResponse = require('../utility/backendShell');


// Post data
const create = async (req, res) => {

    try{
        const {title, Comments, User, CreateComment, Rating, Date} = req.body;
        const fields = {
            title,
            Comments,
            User,
            CreateComment,
            Rating,
            Date
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
        const userComment = await Comment.find({});

        httpResponse.successResponse(res, userComment);
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse.apply(res, e.toString());
    }

}
