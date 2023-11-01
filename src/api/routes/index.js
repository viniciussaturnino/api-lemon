const express = require('express');

const healtCheckRoute = require('./health.route');
const customerRoute = require('./customer.route');

const router = express.Router();

router.use('/', healtCheckRoute);

router.use('/customer', customerRoute);

module.exports = router;
