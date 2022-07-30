const router = require("express").Router();
const homeController = require("./controllers/homeController");
const createCubeController = require("./controllers/createCubeController");
const detailsControler = require("./controllers/detailsController");
const createAccessoryController = require("./controllers/createAccessoryController");
const attachController = require("./controllers/attachController");
const userController = require('./controllers/userController');

router.use("/", homeController);
router.use("/cube", createCubeController);
router.use("/details", detailsControler);
router.use("/accessory", createAccessoryController);
router.use("/attach", attachController);
router.use("/user", userController);

router.get("/about", (req, res) => {
  res.render("about");
});

router.all("*", (req, res) => {
  res.render("404");
});

module.exports = router;
