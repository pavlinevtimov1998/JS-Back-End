const router = require("express").Router();

const homeController = require("./controllers/homeController");
const createController = require("./controllers/createController");

router.use(homeController);

router.use("/cats", createController);

module.exports = router;
