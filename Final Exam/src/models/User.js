const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { SALT } = require("../constants");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minLength: [2, "Username should be at least 2 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    minLength: [10, "Email should be at least 10 characters!"],
  },
  password: {
    type: String,
    minLength: [4, "Password should be at least 4 characters!"],
    required: [true, "Password is required!"],
  },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, SALT);

  this.password = hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
