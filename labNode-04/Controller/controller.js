const NotaModelo = require("../Models/notas");

const criarNota = async (req,res) => {

  try {
    const { CodigoDisciplina, Professor, Disciplina, Nota } = req.body;

    const NovaNota = new NotaModelo({
      CodigoDisciplina,
      Professor,
      Disciplina,
      Nota
    })

    await NovaNota.save();
    res.status(200).send("Nota criada com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Erro ao criar nota!");
  }
};

module.exports = {criarNota};