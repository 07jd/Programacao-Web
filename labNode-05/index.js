const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret_key";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
const consumoEnergia = require("./consumos");
const verificarToken = require("./middleware/auth");
const Users = require("./models/users");

//ligar á db
mongoose.connect("mongodb://localhost:27017/lab5")
.then(() => {
  console.log("Conectado ao MongoDB!");
})
.catch(() => {
  console.log("Erro ao conectar ao MongoDB!");
})

//publico
app.get("/", (req,res) => {
  res.render(public);
})

//acesso só com token
app.get("/consumos/:id", verificarToken,(req,res) => {
  const clienteID = req.params.id;
  const dados = consumoEnergia.obterDadosConsumo(clienteID);

  if(dados){
    res.status(200).json(dados);
  }else{
    res.sendStatus(400);
  }

});

//registra user
app.post("/registrar", async (req,res) => {
  try {
    const { nome, email, password } = req.body;
    //console.log("Valor nome = " + nome + " || Valor email= " + email + " || Valor password= " + password);

    const emailJaExiste = await Users.findOne({ Email: email });
    if(emailJaExiste){
      return res.status(400).json({ mensagem: "Email já registrado!" });
    }

    const novoUser = new Users({ Nome: nome, Email: email, Password: password });
    await novoUser.save();

    res.status(201).json({ mensagem: "Utilizador registrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao registrar novo utilizador!", erro: error.message });
  }

});

//login user
app.post("/login", async (req,res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ Email: email });
    if(!user){
      return res.status(401).json({ mensagem: "Não existe um utilizador com esse email!"});
    }

    if(user.Password !== password){
      return res.status(401).json({ mensagem: "Password Incorreta!"});
    }

    const token = jwt.sign(
      {
        id: user._id,
        nome: user.Nome,
        email: user.Email
      },
      SECRET_KEY,
      {
        expiresIn: "1h"
      }
    );

    res.json( { token });
});

app.listen(port, () => {
  console.log("Iniciado na porta " + port + ".\n");
})