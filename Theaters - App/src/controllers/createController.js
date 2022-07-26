const router = require("express").Router();

const playService = require("../services/playService");
const { errorMessages } = require("../utils/errorMessages");

router.get("/", (req, res) => {
  res.render("theater/create");
});

router.post("/", async (req, res) => {
  const playData = req.body;
  const userId = req.user._id;

  try {
    await playService.createPlay(playData, userId);

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(400).render("theater/create", {
      playData,
      error,
    });
  }
});

module.exports = router;
