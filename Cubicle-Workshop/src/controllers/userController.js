const router = require("express").Router();

const userService = require("../services/userService");
const { sessionName } = require("../constants");

router.get("/register", async (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.redirect("/404");
  }

  const token = await userService.register(username, password);

  res.cookie(sessionName, token, { httpOnly: true });

  res.redirect("/");
});

router.get("/login", async (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const token = await userService.login(username, password);

  res.cookie(sessionName, token, { httpOnly: true });

  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie(sessionName);

  res.redirect("/");
});

module.exports = router;
