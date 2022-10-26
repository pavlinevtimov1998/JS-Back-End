const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const offerController = require("./controllers/offerController");
const catalogController = require("./controllers/catalogController");

router.use("/", homeController);
router.use("/catalog", catalogController);
router.use("/auth", authController);
router.use("/offer", offerController);

module.exports = router;
