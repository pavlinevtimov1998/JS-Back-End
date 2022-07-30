const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { sessionName, secret } = require("../constants");

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
  const token = req.cookies[sessionName];

  try {
    if (token) {
      const decodetToken = await jwtVerify(token, secret);
      
      res.user = decodetToken;
    }
  } catch (err) {
    return res.redirect("/");
  }

  next();
};
