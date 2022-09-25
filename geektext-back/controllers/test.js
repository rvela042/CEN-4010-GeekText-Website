const test = require('../models/test');
const httpResponse = require('../utility/backendShell');

const obtainTest = async (req, res) => {
    try{
      const tests = await test.find({});
  
      httpResponse.successResponse(res, tests);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

  const createTest = async (req, res) => {
    try{

        const { firstName, lastName } = req.body;
        const fields = {
            firstName,
            lastName
        }

        const test = await test.createTest(fields);

        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

module.exports = {obtainTest, createTest};