const router = require("express").Router();

const offerService = require("../services/offerService");

router.get("/", async (req, res) => {
  try {
    const offers = await offerService.getAll();

    res.render("catalog", { offers, length: offers.length > 0 });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
