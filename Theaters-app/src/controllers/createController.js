const router = require("express").Router();

const editController = require("./editController");
const detailsController = require("./detailsController");

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
    const error = errorMessages(err);

    res.status(400).render("theater/create", {
      playData,
      error,
    });
  }
});

router.use("/edit", editController);
router.use("/details", detailsController);

module.exports = router;
