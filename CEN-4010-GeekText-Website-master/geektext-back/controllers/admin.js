const Admin = require('../db/models/admin');
const httpResponse = require('../utility/backendShell');

//Method to create an admin
const create = async (req, res) => {
    try{
        const { username, password, id } = req.body;
        const fields = {
            username,
            password,
            id,
        }

        const create = await Admin.create(fields);
        httpResponse.successResponse(res, 'success')

    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

//Method to read created admin
const read = async (req, res) => {
    try{
      const read = await Admin.find({});
  
      httpResponse.successResponse(res, read);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

//Method to delete admin
const deleteAdmin = async (req, res) => {
  try{
    const { username, password, id} = req.body;
    if(await Admin.findOne({username: username, password: password})){
      const admin = await Admin.findOneAndDelete({id: id});
      httpResponse.successResponse(res, admin);
    } else {
      httpResponse.failureResponse(res, "Incorrect Username or Password");
    } 
    

  } catch (e) {
    console.log(e)
    httpResponse.failureResponse(res, e.toString());
  }
}

  module.exports = {create, read, deleteAdmin};