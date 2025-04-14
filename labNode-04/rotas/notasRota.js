const express = require("express");
const router = express.Router();
const NotaModelo = require("../Models/notas");


router.get("/", async (req, res) => {
  try {
    const notas = await NotaModelo.find(); 
    res.status(200).json(notas);
  } catch (error) {
    res.status(400).send("Erro ao obter notas!");
  }
});

router.get("/:id", async (req, res) => {
  try{
    const nota = await NotaModelo.findById(req.params.id);

    if(!nota){
      throw new Error("Nota não foi encontrada!");
    }

    res.status(200).json(nota);
  }
  catch (err)
  {
    console.log(err);
    res.status(400).send("Não foi encontrada nenhuma nota!");
  }

});

router.post("/", async (req,res) => {
  try{
    const novaNota = new NotaModelo(req.body);
    await novaNota.save();


    res.status(200).send("Nota adicionada com sucesso!");
  }
  catch(err)
  {
    console.log(err);
    res.status(400).send("Falha ao adicionar nota!");
  }
});

router.patch("/:id", async (req,res) => {
  try{
    // "[options.new=false] «Boolean» if true, return the modified document rather than the original"
    const nota = await NotaModelo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(!nota){
      throw new Error("Nota não foi encontrada!");
    }

    res.status(200).send("Nota atualizada com sucesso!");
  }
  catch (err)
  {
    console.log(err);
    res.status(400).send("Não foi possível atualizar a nota!");
  }
});

router.delete("/:id", async (req,res) => {
  try{
    // "[options.new=false] «Boolean» if true, return the modified document rather than the original"
    const nota = await NotaModelo.findByIdAndDelete(req.params.id);

    if(!nota){
      throw new Error("Nota não foi encontrada!");
    }

    res.status(200).send("Nota apagada com sucesso!");
  }
  catch (err)
  {
    console.log(err);
    res.status(400).send("Não foi possível apagar a nota!");
  }
});

router.delete("/", async (req,res) => {
  try {
    await NotaModelo.deleteMany({});
    res.status(200).send("Todas as notas foram removidas.");
  } catch (err) {
    console.log(err);
    res.status(400).send("Erro ao apagar todas as notas.");
  }
})

module.exports = router;

