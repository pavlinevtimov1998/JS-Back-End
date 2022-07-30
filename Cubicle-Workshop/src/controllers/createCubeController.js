const router = require("express").Router();

const createCubeService = require("../services/createCubeService");

router.get("/create", (req, res) => {
  res.render("cubes/create");
});

router.post("/create", async (req, res) => {
  const cube = req.body;
  cube.ownerId = res.user._id;

  await createCubeService.create(cube);

  res.redirect("/");
});

module.exports = router;
