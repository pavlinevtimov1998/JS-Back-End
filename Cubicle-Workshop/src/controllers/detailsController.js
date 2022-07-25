const router = require("express").Router();

const detailsService = require("../services/detailsService");

router.get("/:id", (req, res) => {
  const cube = detailsService.getOne(req.params.id);

  res.render("details", { cube });
});

module.exports = router;
