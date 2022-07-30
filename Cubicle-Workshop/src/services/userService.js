const User = require("../models/User");

const secret = "lihgo2l41121jblkjhvkl121k2hl1ih3vl";
const salt = 10;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

exports.register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashedPassword });

  const jwtSignPromise = promisify(jwt.sign);

  const token = await jwtSignPromise(
    { _id: user._id, username: user.username },
    secret,
    {
      expiresIn: "1d",
    }
  );

  return token;
};
