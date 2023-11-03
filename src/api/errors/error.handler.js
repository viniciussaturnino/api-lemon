const { ValidationError } = require('express-validation');

exports.errorHandler = (error, _request, response, _next) => {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }
  return response.status(500).json(error);
};
