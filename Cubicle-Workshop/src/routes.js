const router = require("express").Router();
const homeController = require("./controllers/homeController");
const createCubeController = require("./controllers/createCubeController");
const detailsControler = require("./controllers/detailsController");
const createAccessoryController = require("./controllers/createAccessoryController");

router.use("/", homeController);
router.use("/cube", createCubeController);
router.use("/details", detailsControler);
router.use("/accessory", createAccessoryController);

module.exports = router;
