const express = require("express");
const router = express.Router();
const consumoEnergia = require("../consumo");

router.get("/:id", (req,res) => {
  const clienteID = req.params.id;
  const dados = consumoEnergia.obterDadosConsumo(clienteID);

  if(dados){
    res.status(200).json(dados);
  }else{
    res.sendStatus(400);
  }
});

module.exports = router;


