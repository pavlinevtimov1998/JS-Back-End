const router = require("express").Router();

const { isAuth } = require("../middlewares/userMiddlewares");
const attachService = require("../services/attachService");

router.get("/:cubeId/accessory", isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;

  const accessories = await attachService.getAccessories(cubeId);

  res.render("accessory/attach", { accessories, cubeId });
});

router.post("/:cubeId/accessory", async (req, res) => {
  const cubeId = req.params.cubeId;
  const accessoryId = req.body.accessory;

  await attachService.attach(cubeId, accessoryId);

  res.redirect(`/details/${cubeId}`);
});

module.exports = router;
