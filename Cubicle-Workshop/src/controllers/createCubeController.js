const router = require("express").Router();
const { isAuth } = require("../middlewares/userMiddlewares");

const createCubeService = require("../services/createCubeService");

router.get("/create", isAuth, (req, res) => {
  res.render("cubes/create");
});

router.post("/create", async (req, res) => {
  const cube = req.body;
  cube.ownerId = res.user._id;

  try {
    await createCubeService.create(cube);

    res.redirect("/");
  } catch (error) {
    let messages = Object.values(error.errors).map((e) => e.message);

    res.status(404).render("cubes/create", { cube, error: messages[0] });
  }
});

module.exports = router;
