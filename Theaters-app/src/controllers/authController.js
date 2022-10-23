const router = require("express").Router();

const authService = require("../services/authService");
const { COOKIE_NAME } = require("../constants");
const { errorMessages } = require("../utils/validationMessages");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/register", async (req, res) => {
  const body = req.body;

  try {
    const token = await authService.register(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    const errors = errorMessages(err.errors);
    console.log(errors);
    res.status(400).render("auth/register", {
      body,
      errors: errors,
    });
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;

  try {
    const token = await authService.login(body);
    console.log(token);
    res.cookie(COOKIE_NAME, token, { httpOnly: true });

    res.redirect("/");
  } catch (err) {
    const errors = errorMessages(err.errors);

    res.status(400).render("auth/login", {
      body,
      errors: errors,
    });
  }
});

module.exports = router;
