const router = require("express").Router();

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const createController = require("./controllers/createController");
const editController = require("./controllers/editController");
const detailsController = require("./controllers/detailsController");
const deleteController = require("./controllers/deleteController");
const likeController = require("./controllers/likeController");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/theater/create", createController);
router.use("/theater/edit", editController);
router.use("/theater/details", detailsController);
router.use("/theater/like", likeController);
router.use("/theater/delete", deleteController);

module.exports = router;
