const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    maxLength: 120,
  },
  cubes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cube",
    },
  ],
});
