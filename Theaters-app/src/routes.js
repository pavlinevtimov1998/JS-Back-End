const router = require("express").Router();

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const createController = require("./controllers/createController");
const editController = require("./controllers/editController");
const detailsController = require("./controllers/detailsController");
const deleteController = require("./controllers/deleteController");
const likeController = require("./controllers/likeController");
const sortController = require("./controllers/sortController");
const { isUser } = require("./middlewares/guards");

router.use("/", homeController);
router.use("/auth", authController);
router.use("/theater/details", isUser, detailsController);
router.use("/theater/create", isUser, createController);
router.use("/theater/edit", isUser, editController);
router.use("/theater/sort", isUser, sortController);
router.use("/theater/like", isUser, likeController);
router.use("/theater/delete", isUser, deleteController);
router.use("**", (req, res) => {
  res.redirect("/");
});

router.use((err, req, res, next) => {
  console.log(err);
  res.redirect("/");
});

module.exports = router;
