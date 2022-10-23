const router = require("express").Router();

const playService = require("../services/playService");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;

  try {
    const play = await playService.getOne(playId);
  } catch (err) {}

  res.render("theater/create");
});

router.post("/:playId", async (req, res) => {
  const playData = req.body;

  try {
    await playService.createPlay(playData);

    res.redirect("/");
  } catch (err) {
    const errors = errorMessages(err.errors);

    res.status(404).render("theater/create", {
      playData,
      errors: errors,
    });
  }
});

module.exports = router;
