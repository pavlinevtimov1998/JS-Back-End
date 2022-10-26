const router = require("express").Router();

const offerService = require("../services/offerService");

router.get("/", async (req, res) => {
  try {
    const offers = await offerService.getLastTreeOffers();

    console.log(offers);
    res.render("home", { offers, length: offers.length > 0 });
  } catch (err) {
    console.log(err);
    res.render("home");
  }
});

module.exports = router;
