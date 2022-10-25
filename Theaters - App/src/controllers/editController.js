const router = require("express").Router();

const playService = require("../services/playService");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;

  try {
    const play = await playService.getOne(playId);

    res.render("theater/edit", play);
  } catch (err) {
    res.redirect("/");
  }
});

router.post("/:playId", async (req, res) => {
  const playData = req.body;
  const playId = req.params.playId;

  try {
    await playService.editPlay(playData, playId);

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).render("theater/edit", {
      playData,
      error,
    });
  }
});

module.exports = router;
