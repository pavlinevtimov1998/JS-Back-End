const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: [50, "Description should be maximum 50 characters!"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userLikes: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
});

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
