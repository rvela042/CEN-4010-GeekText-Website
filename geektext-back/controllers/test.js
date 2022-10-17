const Test = require('../models/test');
const httpResponse = require('../utility/backendShell');

//obtain data
const obtainTest = async (req, res) => {
    try{
      const tests = await Test.find({});
  
      httpResponse.successResponse(res, tests);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

  //post data
  const create = async (req, res) => {
    try{

        const { firstName, lastName } = req.body;
        const fields = {
            firstName,
            lastName
        }

        const test = await Test.create(fields);

        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

module.exports = {obtainTest, create};