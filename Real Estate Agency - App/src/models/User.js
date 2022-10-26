const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { SALT } = require("../constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: [/^[A-Za-z]+ [A-Za-z]+$/i, "Incorrect full name!"],
  },
  username: {
    type: String,
    required: true,
    minLength: [3, "Username should be at least 3 characters!"],
    match: [
      /^[A-Za-z0-9]+$/i,
      "Username should contain only english letters and digits!",
    ],
    unique: true,
  },
  password: {
    type: String,
    minLength: [3, "Password should be at least 3 characters!"],
    match: [
      /^[A-Za-z0-9]+$/i,
      "Password should contain only english letters and digits!",
    ],
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, SALT);

  this.password = hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
