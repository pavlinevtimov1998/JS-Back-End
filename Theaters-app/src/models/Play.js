const mongoose = require("mongoose");

const playSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: [50, "Description should be maximum 50 characters!"],
    },
    imageUrl: {
      type: String,
      trim: true,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    _ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usersLikes: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    countLikes: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: { createdAt: "createdAt" } }
);

const Play = mongoose.model("Play", playSchema);

module.exports = Play;
