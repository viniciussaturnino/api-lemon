const express = require("express");

const healtCheckRoute = require("./health.route");

const router = express.Router();

router.use("/", healtCheckRoute);

module.exports = router;
