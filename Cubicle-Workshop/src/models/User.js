const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    minLength: [5, "Username should be at least 5 characters long!"],
    validate: {
      validator: function (value) {
        return /[a-zA-Z0-9]+/.test(value);
      },
      message: "Username should consist only English leters and digits!",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be at least 8 characters long!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
