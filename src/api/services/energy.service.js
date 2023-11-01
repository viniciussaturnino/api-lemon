const { customerRules } = require('../../config/vars');

exports.getEconomyBasedOnHistory = (consumptionHistory) => {
  const validMonths = consumptionHistory.slice(0, 12);
  const total = validMonths.reduce((a, b) => a + b, 0);
  const average = total / validMonths.length;
  const CO2Economy = (customerRules.CO2Emission * (average * 12)) / customerRules.KWh;

  return { average, CO2Economy };
};
