/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('../api/errors/error.handler');

const routes = require('../api/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

module.exports = app;
