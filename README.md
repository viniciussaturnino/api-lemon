# API Lemon

## Descrição

Essa é uma API construída em Node.js com a finalidade de verificar a
viabilidade/elegibilidade de um pontencial cliente da Lemon. Por meio
da análise do histórico de contas de energia, tipo de conexão e a classe
do cliente essa análise se torna possível, resultando em um calculo final
com o valor de CO2 a ser economizado pelo cliente, caso ele comesse a
utilizar energia limpa.

## Stack Utilizada

- Node.js
- Jest
- Docker
- Docker Compose

## Funcionalidades

- Validação dos dados de entrada
- Validação dos critérios de elegibilidade por cliente
- Calculo de consumo mínimo por cliente para projeção de economia de CO2

## Requisitos para execução do projeto

- Git (≃v2.34.1)
- Docker (≃v24.0.5)
- Docker Compose (≃v2.3.3)
- Node (≃v18.18.0)
- npm (v9.8.1)

## Execução do projeto localmente

Clonar o repositório:

```shell
$ git clone git@github.com:viniciussaturnino/api-lemon.git
```
Acessar a pasta:

```shell
$ cd api-lemon
```
Rodar o container:

```shell
$ docker compose up --build
```
ou:

```shell
$ make build
```

## Testes

Comando para rodar a suíte de testes:

```shell
$ npm run test
```
ou:

```shell
$ make test
```

Comando para rodar a suíte de testes com relatório de coverage:

```shell
$ npm run cov
```
ou:

```shell
$ make coverage
```

## Requisições

### Healthcheck

Está configurada na API, uma rota de verificação de status da aplicação, chamada
de `healthcheck` que retorna um `json` no seguinte formato caso a aplicação esteja
rodando com sucesso:

```json
{
	"uptime": 3.953783992,
	"message": "OK",
	"timestamp": 1698862001840
}
```

Em caso de falha na API essa rota retorna um status `503` com a
mensagem de erro.

### Validate

As requisições para verificar elegibilidade de um cliente são feitas pela rota
`/customer/validate` e é um método `POST` com o seguinte formato:

```json
{
  "numeroDoDocumento": "05561699130",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
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
    4597
  ]
}
```

#### Exemplo de Requisição - Elegível

```curl
curl --request POST \
  --url http://localhost:3000/customer/validate \
  --header 'Content-Type: application/json' \
  --data '{
  "numeroDoDocumento": "05561699130",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
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
    4597
  ]
}'
```

Response Body esperado:

```json
{
  "elegivel": true,
  "economiaAnualDeCO2": 5553.24
}
```

#### Exemplo de Requisição - Não Elegível

```curl
curl --request POST \
  --url http://localhost:3000/customer/validate \
  --header 'Content-Type: application/json' \
  --data '{
  "numeroDoDocumento": "05561699130",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "rural",
  "modalidadeTarifaria": "verde",
  "historicoDeConsumo": [
    3878,
    9760,
    5976,
    2797,
    2481,
    5731,
    7538,
    4392,
    7859,
    4160
  ]
}'
```

Response Body esperado:

```json
{
  "elegivel": false,
  "razoesDeInelegibilidade": [
    "Classe de consumo não aceita",
    "Modalidade tarifária não aceita"
  ]
}
```
