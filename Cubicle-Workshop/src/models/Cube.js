const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 120,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.imageUrl.startsWith("http");
      },
      message: "Image should be a ling!",
    },
  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
