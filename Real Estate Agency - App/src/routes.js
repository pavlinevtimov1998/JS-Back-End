const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const offerController = require("./controllers/offerController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/offer", offerController);

module.exports = router;
