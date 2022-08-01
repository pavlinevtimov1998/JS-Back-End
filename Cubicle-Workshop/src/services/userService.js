const User = require("../models/User");

const { salt, secret } = require("../util");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashedPassword });

  return await getToken(user._id, username);
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return;
  }

  return await getToken(user._id, username);
};

function getToken(userId, username) {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise({ _id: userId, username }, secret, { expiresIn: "1d" });
}
