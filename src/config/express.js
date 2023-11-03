/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const { errorHandler } = require('../api/errors/error.handler');
const swaggerConfig = require('./swagger.json');

const routes = require('../api/routes');

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

module.exports = app;
