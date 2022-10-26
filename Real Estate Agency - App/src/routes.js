const router = require("express").Router();

const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const offerController = require("./controllers/offerController");
const catalogController = require("./controllers/catalogController");
const searchController = require("./controllers/searchController");

const { isUser } = require("./middlewares/guards");

router.use("/", homeController);
router.use("/catalog", catalogController);
router.use("/auth", authController);
router.use("/offer", offerController);
router.use("/search", isUser, searchController);

module.exports = router;
