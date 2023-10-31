const { validConsumptionClasses, validFeeModality, validMinCustomerConsumption } = require("../schemas/validation");
const { getEconomyBasedOnHistory } = require("./energy.service");
const { customerErrors } = require("../errors/api.errors");


function _validateConsumptionClass(consumptionClass) {
  if (!validConsumptionClasses.includes(consumptionClass)) {
    return customerErrors.INVALID_CLASS;
  }
  return;
}

function _validateFeeModality(feeModality) {
  if (!validFeeModality.includes(feeModality)) {
    return customerErrors.INVALID_FEE_MODALITY;
  }
  return;
}

function _validateMinConsumption(average, conectionType) {
  if (average < validMinCustomerConsumption[conectionType]) {
    return customerErrors.LOW_CONSUMPTION;
  }
  return;
}

exports.validate = (
  conectionType,
  consumptionClass,
  feeModality,
  consumptionHistory
  ) => {
  const { average, CO2Economy } = getEconomyBasedOnHistory(consumptionHistory);

  const errors = [
    _validateConsumptionClass(consumptionClass),
    _validateFeeModality(feeModality),
    _validateMinConsumption(average, conectionType),
  ].map((error) => error).filter((error) => error);

  const isValid = (errors.length === 0) ? true : false;
  const responseBody = {
    elegivel: isValid
  };

  if (isValid) {
    responseBody.economiaAnualDeCO2 = CO2Economy;
  } else {
    responseBody.razoesDeInelegibilidade = errors;
  }

  return responseBody;
}
