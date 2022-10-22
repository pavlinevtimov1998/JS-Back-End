const router = require("express").Router();

const playService = require("../services/playService");
const { errorMessages } = require("../utils/validationMessages");

router.get("/", (req, res) => {
  res.render("theater/create");
});

router.post("/", async (req, res) => {
  const playData = req.body;
  try {
    await playService.createPlay(playData);

    res.redirect("/");
  } catch (err) {
    const errors = errorMessages(Object.values(err.errors));

    res.status(404).render("theater/create", {
      playData,
      errors: errors,
    });
  }
});

module.exports = router;
