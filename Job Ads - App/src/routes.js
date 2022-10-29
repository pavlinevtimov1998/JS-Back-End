const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const jobController = require("./controllers/jobController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/jobs", jobController);
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;
