const validConsumptionClasses = [
  'residencial',
  'industrial',
  'comercial',
]

const validFeeModality = [
  'branca',
  'convencional'
]

const validMinCustomerConsumption = {
  monofasica: 400,
  bifasica: 500,
  trifasica: 750
}

module.exports = {
  validConsumptionClasses,
  validFeeModality,
  validMinCustomerConsumption
}
