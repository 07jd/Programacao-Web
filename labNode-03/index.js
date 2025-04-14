const express = require("express");
const app = express();
const port = 3000;

const notasRotas = require("./Controllers/notas");
notasRotas(app);

app.listen(port, () => {
  console.log("Iniciado na porta " + port);
});