const router = require("express").Router();

const playService = require("../services/playService");
const { errorMessages } = require("../utils/errorMessages");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;

  try {
    await playService.deletePlay(playId);

    res.status(201).redirect("/");
  } catch (err) {
    const errors = errorMessages(err);

    res.locals.errors = errors;

    res.status(404).redirect("/");
  }
});

module.exports = router;
