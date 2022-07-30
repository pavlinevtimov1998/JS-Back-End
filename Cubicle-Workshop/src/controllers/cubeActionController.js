const router = require("express").Router();

const { getOne } = require("../services/detailsService");
const { createOptions } = require("../services/cubeActionServise");

router.get("/edit/:cubeId", async (req, res) => {
  const cubeId = req.params.cubeId;

  const cube = await getOne(cubeId).lean();

  const options = createOptions(cube.difficultyLevel);

  res.render("cubes/edit", { cube, options });
});

module.exports = router;
