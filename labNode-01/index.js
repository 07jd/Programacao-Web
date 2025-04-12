const express = require("express");
const app = express();
const port = 3000;

const regex = /^[0-9]*$/; //regex verifica se a string contem apenas digitos
let minhas_notas = [20, 10, 15, 17];
app.use(express.json());

//3a
// http://localhost:3000
app.get("/", (req, res) => {
  console.log("GET / : Lab Node-01");
  res.send("Array -> " + minhas_notas.toString());
});

//3b
// http://localhost:3000/0
app.get("/:indice", (req, res) => {
  const input = req.params.indice;

  try{
    if(!regex.test(input)){
      throw new Error("Índice inválido, deve conter apenas números!");
    }
    const indice = parseInt(input);
    const elemento = minhas_notas[indice];
    
    if (elemento === undefined){
      throw new Error("Indice invalido!");
    }

    res.status(200).send("Elemento " + indice + ": " + elemento);
  }
  catch (err)
  {
    console.log(err);
    res.status(400).send("O indice fornecido ("+ input + ") é invalido!");
  }

});

//3c
// curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{"valor": 99}'
app.post("/", (req,res) => {
  const input = req.body;

  try{

    if(input.valor === undefined){
      throw new Error("Parametro valor está vazio!");
    }

    if (typeof input.valor === "number" && Number.isInteger(input.valor))
    {
      minhas_notas.push(input.valor);
    }else if(typeof input.valor === "string" && regex.test(input.valor)){
      minhas_notas.push(parseInt(input.valor));
    }else {
      throw new Error("Tipo não esperado!");
    }
    
    
    console.log("Elemento adicionado!");
    res.status(200).send("Elemento adicionado com sucesso (Tamanho do array: " + minhas_notas.length + ").");
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send("Falha ao adicionar elemento ao array!\n");
  }
});

//3d
// curl -X POST http://localhost:3000/99
app.post("/:novoValor", (req,res) => {
  const input = req.params.novoValor;

  try{
    if(!regex.test(input)){
      throw new Error("Falha ao adicionar elemento, o input deve conter apenas digitos!");
    }

    minhas_notas.push(parseInt(input));
    console.log("Elemento adicionado!");
    res.status(200).send("Elemento adicionado com sucesso (Tamanho do array: " + minhas_notas.length + ").");
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send("Falha ao adicionar elemento ao array!\n");
  }
});


//3e
// curl -X PATCH http://localhost:3000/0 -H "Content-Type: application/json" -d '{"valor": 1234}'
app.patch("/:indice", (req,res) => {
  const input = req.params.indice;
  const inputBody = req.body.valor;

  try{
    //Verificar se o indice é valido
    if(!regex.test(input)){
      throw new Error("Indice deve ser constituído apenas por digítos!");
    }

    const indice = parseInt(input);

    if(indice > (minhas_notas.length - 1) || indice < 0){
      throw new Error("Indice fora dos limites!");
    }

    if( inputBody === undefined ){
      throw new Error("Valor do body não definido!");
    }

    if(typeof inputBody !== "number" || !Number.isInteger(inputBody)){
      throw new Error("Tipo não esperado!");
    }

    console.log("Valor do indice selecionado foi alterado!");
    minhas_notas[indice] = inputBody;
    res.send("Valor alterado com sucesso!");
  } catch (err) {
    console.log(err);
    res.send("Não foi possível alterar o valor no indice selecionado!");
  }
});

//3f
// curl -X DELETE http://localhost:3000/0
app.delete("/:indice", (req,res) => {
  const input = req.params.indice;

  try{
    if(!regex.test(input)){
      throw new Error("Indice deve ser constituído apenas por digítos!");
    }

    const indice = parseInt(input);

    if(indice > (minhas_notas.length - 1) || indice < 0){
      throw new Error("Indice fora dos limites!");
    }


    console.log("Valor do indice selecionado removido!");
    minhas_notas.splice(indice, 1);
    res.send("Valor removido com sucesso!");
  } catch (err) {
    console.log(err);
    res.send("Não foi possível remover o valor no indice selecionado!");
  }
});

//3g
// curl -X DELETE http://localhost:3000/
app.delete("/", (req,res) => {
  if(minhas_notas.length > 0){
    minhas_notas.length = 0;
    res.status(200).send("Array esvaziado!");
  }else{
    res.status(400).send("O array já se encontra vazio!");
  }

})


app.listen(port, () => {
  console.log("Iniciado na porta " + port);
});