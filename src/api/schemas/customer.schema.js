const Joi = require('joi');

const {
  classesDeConsumoEnum,
  modalidadesTarifariasEnum,
  tiposDeConexaoEnum,
} = require('./enum');

const tiposDeConexao = Object.values(tiposDeConexaoEnum);
const classesDeConsumo = Object.values(classesDeConsumoEnum);
const modalidadesTarifarias = Object.values(modalidadesTarifariasEnum);

const customerSchema = {
  body: Joi.object({
    numeroDoDocumento: Joi.string()
      .pattern(/(^\d{11}$)|(^\d{14}$)/)
      .required(),
    tipoDeConexao: Joi.string()
      .valid(...tiposDeConexao)
      .required(),
    classeDeConsumo: Joi.string()
      .valid(...classesDeConsumo)
      .required(),
    modalidadeTarifaria: Joi.string()
      .valid(...modalidadesTarifarias)
      .required(),
    historicoDeConsumo: Joi.array()
      .items(Joi.number().integer())
      .min(3)
      .max(12),
  }),
};

module.exports = customerSchema;
