document.getElementById("consultarBotao").addEventListener("click", async() => {
  const clienteID = document.getElementById("clienteId").value;
  const resultado = document.getElementById("resultado");

  if(clienteID == "" || clienteID == null){
    return;
  }

  try{
    const resposta = await fetch("/consumos/" + clienteID);
    
    if(!resposta.ok){
      resultado.textContent = "Cliente não encontrado!";
      return;
    }

    const dados = await resposta.json();
    resultado.textContent = JSON.stringify(dados, null, 2);
  
  }catch(err){
    resultado.textContent = "Erro ao consultar consumos de eletricidade!";
    console.log("Algo correu mal! -> " + err);

    return;
  }
});