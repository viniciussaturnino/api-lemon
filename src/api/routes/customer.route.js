const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();

const controller = require('../controllers/customer.controller');
const customerSchema = require('../schemas/customer.schema');

router.route('/validate').post(
  validate(customerSchema),
  controller.validate,
);

module.exports = router;
