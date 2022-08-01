const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { sessionName, secret } = require("../util");

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
  const token = req.cookies[sessionName];

  try {
    if (token) {
      const decodetToken = await jwtVerify(token, secret);

      res.user = decodetToken;

      res.locals.user = decodetToken;
    }
  } catch (err) {
    return res.redirect("/");
  }

  next();
};

exports.isAuth = async (req, res, next) => {
  if (!res.user) {
    return res.redirect("/");
  }

  next();
};
