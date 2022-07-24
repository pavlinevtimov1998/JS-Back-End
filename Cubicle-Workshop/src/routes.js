const router = require("express").Router();
const homeController = require("./controllers/homeController");
const createController = require("./controllers/createController");

router.use("/", homeController);
router.use("/cube", createController);

module.exports = router;
