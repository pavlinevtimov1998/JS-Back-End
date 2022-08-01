const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "Cube name should be at least 5 characters long!"],
    validate: {
      validator: function (value) {
        return /[a-zA-Z0-9 ]+/.test(value);
      },
      message: "Cube name should consist only English leters and digits!",
    },
  },
  description: {
    type: String,
    required: true,
    minLength: [20, "Description should be at least 20 characters long!"],
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
