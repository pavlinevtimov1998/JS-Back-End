const router = require("express").Router();

const playService = require("../services/playService");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;
  const userId = req.user._id;

  try {
    await playService.likePlay(playId, userId).lean();

    res.redirect("/theater/details/" + playId);
  } catch (err) {
    res.status(404).redirect("/");
  }
});

module.exports = router;
