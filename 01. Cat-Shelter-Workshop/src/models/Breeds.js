const mongoose = require("mongoose");

const BreedSchema = new mongoose.Schema({
  value: String,
});

const Breed = mongoose.model("breed", BreedSchema);

exports.Breed = Breed;
