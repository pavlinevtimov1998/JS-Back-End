const router = require("express").Router();

const playService = require("../services/playService");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;
  const userId = res.locals.user?._id;

  try {
    const play = await playService.likePlay(playId, userId).lean();

    res.redirect("/theater/details/" + playId);
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
