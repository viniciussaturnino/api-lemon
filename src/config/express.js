/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const { ValidationError } = require('express-validation');

const routes = require('../api/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use((error, _request, response, _next) => {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error);
  }
  return response.status(500).json(error);
});

module.exports = app;
