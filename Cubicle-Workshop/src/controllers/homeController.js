const router = require("express").Router();
const homeService = require("../services/homeService");

router.get("/", (req, res) => {
  const { search, from, to } = req.query;

  const cubes = homeService.getCubes(search, from, to);

  res.render("index", { cubes, search, from, to });
});

module.exports = router;
