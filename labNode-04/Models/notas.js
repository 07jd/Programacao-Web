const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    CodigoDisciplina: {
      type: Number,
      required: true,
      unique: true
    },
    Professor: {
      type: String,
      required: true
    },
    Disciplina: {
      type: String,
      required: true
    },
    Nota: {
      type: Number,
      min: 0,
      max: 20,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Notas = mongoose.model("Notas", schema);

module.exports = Notas;