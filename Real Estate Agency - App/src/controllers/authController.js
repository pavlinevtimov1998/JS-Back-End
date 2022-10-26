const router = require("express").Router();

const authService = require("../services/authService");

const { isGuest, isUser } = require("../middlewares/guards");
const { errorMessages } = require("../utils/errorMessages");
const { COOKIE_NAME } = require("../constants");

router.get("/register", isGuest, (req, res) => {
  res.render("auth/register");
});

router.get("/login", isGuest, (req, res) => {
  res.render("auth/login");
});

router.post("/register", async (req, res) => {
  const body = req.body;

  try {
    const token = await authService.register(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);
    console.log(error);

    res.status(400).render("auth/register", {
      body,
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;

  try {
    const token = await authService.login(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).render("auth/login", {
      body,
      error,
    });
  }
});

router.get("/logout", isUser, (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect("/");
});

module.exports = router;
