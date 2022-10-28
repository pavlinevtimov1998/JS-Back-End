const User = require("../models/User");
const bcrypt = require("bcrypt");

const { getToken } = require("../utils/jwt");
const { error } = require("../utils/errorMessages");

exports.register = async (body) => {
  const { email, skils, password, rePassword } = body;
  

  if (email == "" || password == "" || skils == "") {
    throw error("All fields are required!");
  }

  if (password !== rePassword) {
    throw error("Passwords don't match!");
  }

  const user = await User.create({ email, password, skils });

  return getToken(user._id, user.email);
};

exports.login = async (body) => {
  const { password, email } = body;

  if (password == "" || email == "") {
    throw error("All fields are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw error("email or password don't match!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw error("email or password don't match!");
  }

  return getToken(user._id, email);
};
