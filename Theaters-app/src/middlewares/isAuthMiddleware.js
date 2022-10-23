const { COOKIE_NAME } = require("../constants");
const { verifyToken } = require("../utils/jwt");

exports.isAuth = async (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];

  if (!token) {
    return next();
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return next();
    }

    res.locals.user = payload;

    next();
  } catch (err) {
    console.log(err);
    next();
  }
};
