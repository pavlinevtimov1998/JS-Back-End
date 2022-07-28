const router = require("express").Router();
const homeService = require("../services/homeService");

router.get("/", async (req, res) => {
  const { search, from, to } = req.query;

  const cubes = await homeService.getCubes(search, from, to).lean();

  res.render("home", { cubes, search, from, to });
});

module.exports = router;
