const router = require("express").Router();

const editController = require("./editController");

const playService = require("../services/playService");
const { errorMessages } = require("../utils/validationMessages");

router.get("/create", (req, res) => {
  res.render("theater/create");
});

router.post("/create", async (req, res) => {
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

router.use("/edit", editController);

module.exports = router;
