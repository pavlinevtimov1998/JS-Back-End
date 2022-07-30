const router = require("express").Router();

const userService = require("../services/userService");

router.get("/register", async (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.redirect("/404");
  }

  const token = await userService.register(username, password);

  res.cookie("session", token);

  res.redirect("/");
});

module.exports = router;
