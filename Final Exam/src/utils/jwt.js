const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { SECRET } = require("../constants");

exports.getToken = (payload) => {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise(payload, SECRET, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (token) => {
  const jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, SECRET);
};
