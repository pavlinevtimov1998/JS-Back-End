const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const postsController = require("./controllers/postController");
const profileController = require("./controllers/profileController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/posts", postsController);
router.use("/profile", profileController);

router.use("/404", (req, res) => {
  res.render("404");
});

router.use("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
