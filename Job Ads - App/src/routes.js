const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const jobController = require("./controllers/jobController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/jobs", jobController);

module.exports = router;
