const router = require("express").Router();
const cubes = require("../db.json");

router.get("/", (req, res) => {
  res.render("index", { cubes });
});

module.exports = router;
