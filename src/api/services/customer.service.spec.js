/* eslint-disable no-undef */
const { validate } = require('./customer.service');
const validation = require('../schemas/validation');
const { customerErrors } = require('../errors/api.errors');
const { getEconomyBasedOnHistory } = require('./energy.service');

jest.mock('./energy.service');

describe('validate', () => {
  it('Should return valid response', () => {
    getEconomyBasedOnHistory.mockReturnValue({ average: 100, CO2Economy: 50 });

    const conectionType = 'bifasico';
    const consumptionClass = validation.validConsumptionClasses[0];
    const feeModality = validation.validFeeModality[0];
    const consumptionHistory = [
      3878,
      9760,
      5976,
      2797,
      2481,
      5731,
      7538,
      4392,
      7859,
      4160,
      6941,
      4597,
    ];

    const result = validate(conectionType, consumptionClass, feeModality, consumptionHistory);

    expect(getEconomyBasedOnHistory).toHaveBeenCalledWith(consumptionHistory);
    expect(result.elegivel).toBe(true);
    expect(result.economiaAnualDeCO2).toBe(50);
    expect(result.razoesDeInelegibilidade).toBeUndefined();
  });

  it('Should return an invalid response by consumption class error', () => {
    const conectionType = 'bifasico';
    const consumptionClass = 'InvalidClass';
    const feeModality = validation.validFeeModality[0];
    const consumptionHistory = [10, 20, 30];

    const result = validate(conectionType, consumptionClass, feeModality, consumptionHistory);

    expect(result.elegivel).toBe(false);
    expect(result.economiaAnualDeCO2).toBeUndefined();
    expect(result.razoesDeInelegibilidade).toContain(customerErrors.INVALID_CLASS);
  });

  it('Should return an invalid response by fee modality error', () => {
    const conectionType = 'bifasico';
    const consumptionClass = validation.validConsumptionClasses[0];
    const feeModality = 'InvalidModality';
    const consumptionHistory = [10, 20, 30];

    const result = validate(conectionType, consumptionClass, feeModality, consumptionHistory);

    expect(result.elegivel).toBe(false);
    expect(result.economiaAnualDeCO2).toBeUndefined();
    expect(result.razoesDeInelegibilidade).toContain(customerErrors.INVALID_FEE_MODALITY);
  });

  it('Should return an invalid response by low consumption', () => {
    getEconomyBasedOnHistory.mockReturnValue({ average: 10, CO2Economy: 50 });

    const conectionType = 'monofasica';
    const consumptionClass = validation.validConsumptionClasses[0];
    const feeModality = validation.validFeeModality[0];
    const consumptionHistory = [10, 20, 30];

    const result = validate(conectionType, consumptionClass, feeModality, consumptionHistory);

    expect(getEconomyBasedOnHistory).toHaveBeenCalledWith(consumptionHistory);
    expect(result.elegivel).toBe(false);
    expect(result.economiaAnualDeCO2).toBeUndefined();
    expect(result.razoesDeInelegibilidade).toContain(customerErrors.LOW_CONSUMPTION);
  });
});
