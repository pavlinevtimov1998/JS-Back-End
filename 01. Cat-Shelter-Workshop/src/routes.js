const router = require("express").Router();

const homeController = require("./controllers/homeController");
const createController = require("./controllers/createController");
const editController = require("./controllers/editController");

router.use(homeController);

router.use("/cats", createController);

router.use('/edit', editController);

module.exports = router;
