const router = require("express").Router();
const fs = require("fs/promises");
const cubes = require("../db.json");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const cube = req.body;

  cubes.push(cube);

  await fs.writeFile("src/db.json", JSON.stringify(cubes, "", 4), "utf-8");

  res.redirect("/");
});

module.exports = router;
