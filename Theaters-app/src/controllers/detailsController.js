const router = require("express").Router();

const playService = require("../services/playService");
// const { errorMessages } = require("../utils/errorMessages");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;
  const userId = res.locals.user?._id;

  try {
    const play = await playService.getOne(playId).lean();

    const canLike = !(
      play.usersLikes.find((id) => id == userId) || play._ownerId == userId
    );

    play.canLike = canLike;
    play.isOwner = play._ownerId == userId;
    play.isLiked = !canLike && !play.isOwner;

    res.render("theater/details", play);
  } catch (err) {
    // const error = errorMessages(err);

    // res.locals.error = error;

    res.status(404).redirect("/");
  }
});

module.exports = router;
