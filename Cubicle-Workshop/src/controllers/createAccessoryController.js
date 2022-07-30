const router = require("express").Router();
const { isAuth } = require("../middlewares/userMiddlewares");

const accessoryService = require("../services/createAccessoryService");

router.get("/create", isAuth, (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const accessoryData = req.body;

  await accessoryService.create(accessoryData);

  res.redirect("/");
});

module.exports = router;
