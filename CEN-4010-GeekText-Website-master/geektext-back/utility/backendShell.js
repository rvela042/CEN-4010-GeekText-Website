const successResponse = (res, data) =>
  res.status(200).send({ success: true, data });

const failureResponse = (res, data, code = 400) =>
  res.status(code).send({ success: false, error: data });

module.exports = { successResponse, failureResponse };
