const User = require("../models/User");
const bcrypt = require("bcrypt");

const { getToken } = require("../utils/jwt");
const { error } = require("../utils/errorMessages");

exports.register = async (body) => {
  const { password, rePassword, username, name } = body;

  if (username == "" || password == "") {
    throw error("All fields are required!");
  }

  if (password !== rePassword) {
    throw error("Passwords don't match!");
  }

  const user = await User.create({ name, username, password });

  return getToken(user._id, user.username);
};

exports.login = async (body) => {
  const { password, username } = body;

  if (password == "" || username == "") {
    throw error("All fields are required!");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw error("Username or password don't match!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw error("Username or password don't match!");
  }

  return getToken(user._id, username);
};
