const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { SALT } = require("../constants");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  likedPlays: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
      ref: "Theater",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, SALT);

  this.password = hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
