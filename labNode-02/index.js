const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
const consumoEnergia = require("./consumos");

app.get("/", (req,res) => {
  res.render(public);
})

app.get("/consumos/:id", (req,res) => {
  const clienteID = req.params.id;
  const dados = consumoEnergia.obterDadosConsumo(clienteID);

  if(dados){
    res.status(200).json(dados);
  }else{
    res.sendStatus(400);
  }

});

app.listen(port, () => {
  console.log("Iniciado na porta " + port + ".\n");
})