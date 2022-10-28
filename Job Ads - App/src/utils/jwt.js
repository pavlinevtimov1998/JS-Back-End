const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { SECRET } = require("../constants");

exports.getToken = (_id, email) => {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise({ _id, email }, SECRET, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (token) => {
  const jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, SECRET);
};
