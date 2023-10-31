const assert = require('assert');
const { getEconomyBasedOnHistory } = require('./energy.service');
const { customerRules } = require("../../config/vars");


describe('getEconomyBasedOnHistory', () => {
  it('Should calculate the average correctly', () => {
    const consumptionHistory = [100, 200, 300];
    const expectedAverage = (100 + 200 + 300) / 3;
    const result = getEconomyBasedOnHistory(consumptionHistory);

    assert.strictEqual(result.average, expectedAverage);
  });

  it('Should calculate CO2 economy correctly', () => {
    const consumptionHistory = [100, 200, 300];
    const expectedCO2Economy = (customerRules.CO2Emission * (2400)) / customerRules.KWh;
    const result = getEconomyBasedOnHistory(consumptionHistory);

    assert.strictEqual(result.CO2Economy, expectedCO2Economy);
  });
});
