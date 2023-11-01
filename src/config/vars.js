/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  customerRules: {
    connections: {
      monofasico: process.env.MONOFASICO_VALUE || 400,
      bifasico: process.env.BIFASICO_VALUE || 500,
      trifasico: process.env.TRIFASICO_VALUE || 750,
    },
    KWh: process.env.KWH || 1000,
    CO2Emission: process.env.CO2_EMISSION || 84,
  },
};
