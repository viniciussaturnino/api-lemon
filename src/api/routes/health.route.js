const express = require('express');

const router = express.Router();

router.get('/health-check', async (_request, response, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    response.status(200).send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    response.status(503).send();
  }
});

module.exports = router;
