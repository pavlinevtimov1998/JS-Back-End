const router = require("express").Router();

const { getOne } = require("../services/detailsService");
const { isAuth } = require("../middlewares/userMiddlewares");
const cubeActionServise = require("../services/cubeActionServise");

router.get("/edit/:cubeId", isAuth, async (req, res) => {
  const { cubeId } = req.params;

  const cube = await getOne(cubeId).lean();

  const options = cubeActionServise.createOptions(cube.difficultyLevel);

  res.render("cubes/edit", { cube, options });
});

router.post("/edit/:cubeId", async (req, res) => {
  const cube = req.body;
  const { cubeId } = req.params;

  cube.ownerId = res.user._id;

  const options = cubeActionServise.createOptions(cube.difficultyLevel);

  try {
    await cubeActionServise.edit(cubeId, cube);

    res.redirect(`/details/${cubeId}`);
  } catch (error) {
    console.log(error);
    const messages = Object.values(error.errors).map((e) => e.message);

    res.status(404).render("cubes/edit", { cube, options, error: messages[0] });
  }
});

router.get("/delete/:cubeId", isAuth, async (req, res) => {
  const { cubeId } = req.params;

  const cube = await getOne(cubeId).lean();

  const options = cubeActionServise.createOptions(cube.difficultyLevel);

  res.render("cubes/delete", { cube, options });
});

router.post("/delete/:cubeId", async (req, res) => {
  const { cubeId } = req.params;

  await cubeActionServise.delete(cubeId);

  res.redirect(`/`);
});

module.exports = router;
