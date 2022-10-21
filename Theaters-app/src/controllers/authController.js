const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
