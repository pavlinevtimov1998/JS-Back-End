const router = require("express").Router();

const authService = require("../services/authService");

const { COOKIE_NAME } = require("../constants");
const { isGuest, isUser } = require("../middlewares/guards");
const { errorMessages } = require("../utils/errorMessages");

router.get("/register", isGuest(), (req, res) => {
  res.render("auth/register", {
    title: "Register Page",
  });
});

router.post("/register", isGuest(), async (req, res) => {
  const body = req.body;

  try {
    const token = await authService.register(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(400).render("auth/register", {
      title: "Register Page",
      body,
      error,
    });
  }
});

router.get("/login", isGuest(), (req, res) => {
  res.render("auth/login", {
    title: "Login Page",
  });
});

router.post("/login", isGuest(), async (req, res) => {
  const body = req.body;

  try {
    const token = await authService.login(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).render("auth/login", {
      title: "Login Page",
      body,
      error,
    });
  }
});

router.get("/logout", isUser(), (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect("/");
});

module.exports = router;
