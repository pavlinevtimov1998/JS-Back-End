const router = require("express").Router();
const homeController = require("./controllers/homeController");
const createController = require("./controllers/createController");
const detailsControler = require("./controllers/detailsController");

router.use("/", homeController);
router.use("/cube", createController);
router.use("/details", detailsControler);

module.exports = router;
