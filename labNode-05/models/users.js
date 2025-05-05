const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    Nome: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", schema);
module.exports = Users;