const { customerRules } = require("../../config/vars")

const tiposDeConexaoEnum = {
  monofasico: 'monofasico',
  bifasico: 'bifasico',
  trifasico: 'trifasico'
}

const valoresPorTiposDeConexaoEnum = {
  monofasico: customerRules.connections.monofasico,
  bifasico: customerRules.connections.bifasico,
  trifasico: customerRules.connections.trifasico
}

const classesDeConsumoEnum = {
  residencial: 'residencial',
  industrial: 'industrial',
  comercial: 'comercial',
  rural: 'rural',
  poderPublico: 'poderPublico'
}

const modalidadesTarifariasEnum = {
  azul: 'azul',
  branca: 'branca',
  verde: 'verde',
  convencional: 'convencional'
}

module.exports = {
  tiposDeConexaoEnum,
  valoresPorTiposDeConexaoEnum,
  classesDeConsumoEnum,
  modalidadesTarifariasEnum,
}
