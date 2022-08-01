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
  },
  cubes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cube",
    },
  ],
});

accessorySchema.path("imageUrl").validate(function () {
  return this.imageUrl.startsWith("http");
}, "Image should be a link!");

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
