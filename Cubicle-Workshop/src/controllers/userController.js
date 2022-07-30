const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = 10;

const userService = require("../services/userService");

router.get("/register", async (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.redirect("/404");
  }

  const hashedPassword = await bcrypt.hash(password, salt);

  await userService.register({ username, password: hashedPassword });

  res.redirect("/");
});

module.exports = router;
