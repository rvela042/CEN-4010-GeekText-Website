const User = require('../models/user');
const httpResponse = require('../utility/backendShell');

//obtain data

const obtainUser = async (req, res) => {
    try{
      const users = await User.find({});
  
      httpResponse.successResponse(res, users);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

  //post data

  const create = async (req, res) => {
    try{

        const { username, password, firstname, lastname, email, homeaddress} = req.body;
        const fields = {
            username,
            password,
            firstname,
            lastname,
            email,
            homeaddress

        }

        const user = await User.create(fields);

        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

    

}

const findUser = async(req, res) => {
  try{

    const { id: username} = req.query;
        const fields = {
            username

        }
        const user = await User.find({'username': {'$eq': fields}});

    httpResponse.successResponse(res, user)
} catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
}

}

const updateUser = async(req, res) => {
  try{
        const {_id, fields} = req.body;
        const user = await User.findOneAndUpdate({_id}, fields).exec();

    httpResponse.successResponse(res, user)
} catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
}

}


module.exports = {obtainUser, create, findUser, updateUser};