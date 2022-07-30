const router = require("express").Router();

const detailsService = require("../services/detailsService");

router.get("/:cubeId", async (req, res) => {
  const cube = await detailsService.getDetailed(req.params.cubeId).lean();

  const isOwner = res.user?._id == cube.ownerId;

  console.log(isOwner);

  res.render("details", { cube, isOwner });
});

module.exports = router;
