const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { COOKIE_NAME } = require("../constants");

exports.getToken = (userId, username) => {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise({ _id: userId, username }, COOKIE_NAME, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (token) => {
  const jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, COOKIE_NAME);
};
