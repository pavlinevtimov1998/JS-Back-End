const router = require("express").Router();

const playService = require("../services/playService");

router.get("/likes", async (req, res) => {
  try {
    const plays = await playService.getSortedByLikes().lean();

    res.render("home", { plays });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/date", async (req, res) => {
  try {
    const plays = await playService.getSortedByDate().lean();

    res.render("home", { plays });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
