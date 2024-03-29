const User = require('../db/models/user');
const httpResponse = require('../utility/backendShell');

//obtain data
const findAllUsers = async (req, res) => {
    try{
      const users = await User.find({},{creditCard: 0});
  
      httpResponse.successResponse(res, users);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

  //post data
  const createUser = async (req, res) => {
    try{
        const { username, password, firstname, lastname, email, homeaddress} = req.body;
        const fields = {
            username,
            password,
            firstname,
            lastname,
            email,
            homeaddress,
            creditCard: []
        }

        const user = await User.create(fields);

        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

const findUserByUsername = async(req, res) => {
  try {
      const user = await User.find({"username": req.params.username},{creditCard: 0});
      if (user.length != 0){
         httpResponse.successResponse(res, user);
      }else {
        httpResponse.failureResponse(res, "That user does not exist");
      }
} catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
}
}

const updateUser = async(req, res) => {

  if(Object.keys(req.body).length === 0){
    httpResponse.failureResponse(res, "Error! Payload cannot be empty!");
  }
  
  try{
    const { username, password, firstname, lastname, homeaddress} = req.body;
        const fields = {
            username,
            password,
            firstname,
            lastname,
            homeaddress

        }

        const user = await User.findOneAndUpdate({"username": req.params.username}, fields, {
            new: true
          });
        
    httpResponse.successResponse(res, user);
} catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
}
}

module.exports = {findAllUsers, createUser, findUserByUsername, updateUser};