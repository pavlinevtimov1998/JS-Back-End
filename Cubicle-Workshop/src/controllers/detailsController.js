const router = require("express").Router();

const detailsService = require("../services/detailsService");

router.get("/:cubeId", async (req, res) => {
  const cube = await detailsService.getDetailed(req.params.cubeId).lean();

  res.render("details", { cube });
});

module.exports = router;
