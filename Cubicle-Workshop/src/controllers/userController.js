const router = require("express").Router();

const { isAuth } = require("../middlewares/userMiddlewares");

const userService = require("../services/userService");
const { sessionName, trimAll, validatePass } = require("../util");

router.get("/register", async (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const [username, password, repeatPassword] = trimAll(Object.values(req.body));

  try {
    validatePass(password, repeatPassword);

    const token = await userService.register(username, password);

    res.cookie(sessionName, token, { httpOnly: true });

    res.redirect("/");
  } catch (error) {
    const { message } = error.errors?.username || error;

    message.startsWith("E")
      ? res.status(404).render("user/register", {
          username,
          error: "Username is taken! Try again!",
        })
      : res.status(404).render("user/register", { username, error: message });
  }
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

router.get("/logout", isAuth, (req, res) => {
  res.clearCookie(sessionName);

  res.redirect("/");
});

module.exports = router;
