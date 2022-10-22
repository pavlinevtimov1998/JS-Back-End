const router = require("express").Router();

const homeService = require("../services/homeService");

router.get("/", async (req, res) => {
  try {
    if (!req.user) {
      const plays = await homeService.getPlaysForGuest().lean();

      return res.render("home", { plays });
    }

    const plays = await homeService.getAllPlays().lean();

    res.render("home", { plays });
  } catch (err) {
    console.log(err);
    res.locals.error = err.message;
    res.redirect("/");
  }
});

module.exports = router;
