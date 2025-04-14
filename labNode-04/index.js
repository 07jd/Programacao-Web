const express = require("express");
const app = express();
const port = 3000;


const consumoEnergia = require("./rotas/consumosRota");
const notas = require("./rotas/notasRota");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lab4")
.then(() => {
  console.log("Conectado ao MongoDB!");
})
.catch(() => {
  console.log("Erro ao conectar ao MongoDB!");
})


app.use(express.json());
app.use(express.static(__dirname + "/public"));

const middleware = (req,res,next) => {
  const data = new Date();

  console.log("Tipo do pedido: " + req.method+ ". [" +  
    data.getDate() + "-" + (data.getMonth() +1)  + "-" + data.getFullYear() + " " +
    data.getHours() + "h" +  data.getMinutes() + "m" + data.getSeconds() + "s" +"]"
  );

  next();
}

app.use(middleware);
app.use("/consumos", consumoEnergia);
app.use("/notas", notas);

app.get("/", (req,res) => {
  res.render(public);
})

app.listen(port, () => {
  console.log("Iniciado na porta " + port + ".\n");
})