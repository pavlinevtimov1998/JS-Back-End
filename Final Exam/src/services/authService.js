const User = require("../models/User");
const bcrypt = require("bcrypt");

const { getToken } = require("../utils/jwt");
const { error } = require("../utils/errorMessages");

exports.register = async (body) => {
  const { password, rePassword, username, email } = body;

  if (password !== rePassword) {
    throw error("Passwords don't match!");
  }

  const user = await User.create({ email, username, password });

  return getToken({
    _id: user._id,
    email: user.email,
    username: user.username,
  });
};

exports.login = async (body) => {
  const { password, email } = body;

  if (password == "" || email == "") {
    throw error("All fields are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw error("Username or password don't match!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw error("Username or password don't match!");
  }

  return getToken({
    _id: user._id,
    email: user.email,
    username: user.username,
  });
};
