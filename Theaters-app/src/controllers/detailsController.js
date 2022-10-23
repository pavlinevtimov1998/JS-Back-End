const router = require("express").Router();

const playService = require("../services/playService");
// const { errorMessages } = require("../utils/validationMessages");

router.get("/:playId", async (req, res) => {
  const playId = req.params.playId;

  try {
    const play = await playService.getOne(playId).lean();

    res.render("theater/details", play);
  } catch (err) {
    // const error = errorMessages(err);

    // res.locals.error = error;

    res.status(400).redirect("/");
  }
});

module.exports = router;
