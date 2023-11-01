const { validConsumptionClasses, validFeeModality, validMinCustomerConsumption } = require('../schemas/validation');
const { getEconomyBasedOnHistory } = require('./energy.service');
const { customerErrors } = require('../errors/api.errors');

function validateConsumptionClass(consumptionClass) {
  if (!validConsumptionClasses.includes(consumptionClass)) {
    return customerErrors.INVALID_CLASS;
  }
  return null;
}

function validateFeeModality(feeModality) {
  if (!validFeeModality.includes(feeModality)) {
    return customerErrors.INVALID_FEE_MODALITY;
  }
  return null;
}

function validateMinConsumption(average, conectionType) {
  if (average < validMinCustomerConsumption[conectionType]) {
    return customerErrors.LOW_CONSUMPTION;
  }
  return null;
}

exports.validate = (
  conectionType,
  consumptionClass,
  feeModality,
  consumptionHistory,
) => {
  const { average, CO2Economy } = getEconomyBasedOnHistory(consumptionHistory);

  const errors = [
    validateConsumptionClass(consumptionClass),
    validateFeeModality(feeModality),
    validateMinConsumption(average, conectionType),
  ].map((error) => error).filter((error) => error);

  const isValid = (errors.length === 0);
  const responseBody = {
    elegivel: isValid,
  };

  if (isValid) {
    responseBody.economiaAnualDeCO2 = CO2Economy;
  } else {
    responseBody.razoesDeInelegibilidade = errors;
  }

  return responseBody;
};
