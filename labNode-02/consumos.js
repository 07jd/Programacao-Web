const clientes = {
  "1" : {
    "clienteId": "1",
    "nome": "João Silva",
    "endereco": {
    "rua": "Rua Esquerda",
    "numero": "42",
    "cidade": "Lisboa",
    "codigoPostal": "1234-567"
    },
    "consumo": [
    {
    "mes": "Janeiro",
    "ano": 2023,
    "kWhConsumido": 250,
    "custoTotal": 35.50,
    "dataLeitura": "2023-01-31"
    }
    ],
    "informacoesAdicionais": {
    "tipoTarifa": "Residencial",
    "fornecedorEnergia": "Empresa XYZ",
    "contratoAtivo": true
    }
   },

   "2" : {
    "clienteId": "2",
    "nome": "Antonio Silva",
    "endereco": {
    "rua": "Rua Direita",
    "numero": "43",
    "cidade": "Lisboa",
    "codigoPostal": "4444-567"
    },
    "consumo": [
    {
    "mes": "Janeiro",
    "ano": 2023,
    "kWhConsumido": 144,
    "custoTotal": 27.50,
    "dataLeitura": "2023-01-31"
    }
    ],
    "informacoesAdicionais": {
    "tipoTarifa": "Residencial",
    "fornecedorEnergia": "Empresa ABC",
    "contratoAtivo": true
    }
   }
};


function obterDadosConsumo(ClienteId){
  return clientes[ClienteId];
}

module.exports = {obterDadosConsumo};


