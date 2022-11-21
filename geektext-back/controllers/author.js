const Author = require('../db/models/author');
const Admin = require('../db/models/admin');
const httpResponse = require('../utility/backendShell');

//method to obtain author 
const read = async (req, res) => {
    try{
      const author = await Author.find({});
      httpResponse.successResponse(res, author);

    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

//method to create authors only by admin
const create = async (req, res) => {
    try {
      const { username, password, firstname, lastname, biography, publisher } = req.body;
      var authorized = false;

      if(await Admin.findOne({username: username, password: password})){   
        authorized = true;
      } else {
        httpResponse.failureResponse(res, "Incorrect Username or Password");
      } 
        const fields = {
          firstname,
          lastname,
          biography,
          publisher
        }
        if(authorized == true){
          const author = await Author.create(fields);
          httpResponse.successResponse(res, 'success')
        }

    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

//Method to delete author
const deleteAuthor = async (req, res) => {
    try{
      const { username, password, firstname, lastname} = req.body;
      if(await Admin.findOne({username: username, password: password})){
        await Author.findOneAndDelete({firstname: firstname, lastname: lastname});
        httpResponse.successResponse(res, author);
      } else {
        httpResponse.failureResponse(res, "Incorrect Username or Password");
      } 
      
  
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

module.exports = {read, create, deleteAuthor};