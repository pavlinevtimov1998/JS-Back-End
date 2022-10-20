const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const { sessionName, secret } = require("../util");

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
  const token = req.cookies[sessionName];

  try {
    if (token) {
      const decodedToken = await jwtVerify(token, secret);

      res.user = decodedToken;

      res.locals.user = decodedToken;
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
