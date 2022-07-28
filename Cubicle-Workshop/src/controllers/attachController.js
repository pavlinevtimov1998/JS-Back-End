const router = require("express").Router();
const attachService = require("../services/attachService");

router.get("/:cubeId/accessory", async (req, res) => {
  const accessories = await attachService.getAccessories().lean();

  res.render("accessory/attach", { accessories });
});

router.post("/:cubeId/accessory", async (req, res) => {
  const cubeId = req.params.cubeId;
  const accessoryId = req.body.accessory;

  await attachService.attach(cubeId, accessoryId);

  res.redirect(`/details/${cubeId}`);
});

module.exports = router;
