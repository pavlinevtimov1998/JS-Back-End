const router = require("express").Router();
const attachService = require("../services/attachService");

router.get("/:cubeId/accessory", async (req, res) => {
  const accessories = await attachService.getAccessories().lean();

  res.render("accessory/attach", { accessories });
});

module.exports = router;
