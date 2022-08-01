const router = require("express").Router();
const { isAuth } = require("../middlewares/userMiddlewares");

const accessoryService = require("../services/createAccessoryService");

router.get("/create", isAuth, (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const accessoryData = req.body;

  try {
    await accessoryService.create(accessoryData);

    res.redirect("/");
  } catch (error) {
    const messages = Object.values(error.errors).map((e) => e.message);

    res
      .status(404)
      .render("accessory/create", { accessoryData, error: messages[0] });
  }
});

module.exports = router;
