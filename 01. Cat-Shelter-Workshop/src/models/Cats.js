const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: String,
  breed: String,
  description: String,
  imageUrl: String,
});

const Cat = mongoose.model("cats", CatSchema);

exports.Cat = Cat;
