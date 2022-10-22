const router = require("express").Router();

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const createController = require("./controllers/createController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/create", createController);

module.exports = router;
