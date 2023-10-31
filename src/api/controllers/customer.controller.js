const { cpf, cnpj } = require("cpf-cnpj-validator")

const { validate } = require("../services/customer.service");
const { schemaErrors } = require("../errors/api.errors")


exports.validate = async (request, response, _next) => {
  const {
    numeroDoDocumento: documentNumber,
    tipoDeConexao: conectionType,
    classeDeConsumo: consumptionClass,
    modalidadeTarifaria: feeModality,
    historicoDeConsumo: consumptionHistory,
  } = request.body;

  if (documentNumber.length === 11 && !cpf.isValid(documentNumber)) {
    return response.status(400).json({
      elegivel: false,
      razoesDeInelegibilidade: [
        schemaErrors.INVALID_CPF
      ]
    });
  }

  if (documentNumber.length === 14 && !cnpj.isValid(documentNumber)) {
    return response.status(400).json({
      elegivel: false,
      razoesDeInelegibilidade: [
        schemaErrors.INVALID_CNPJ
      ]
    });
  }

  const responseBody = validate(
    conectionType,
    consumptionClass,
    feeModality,
    consumptionHistory
  );

  const responseStatus = (responseBody.elegivel === true) ? 200 : 400;

  return response.status(responseStatus).json(responseBody);
};
