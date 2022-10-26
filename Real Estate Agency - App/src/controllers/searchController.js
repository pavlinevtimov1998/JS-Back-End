const router = require("express").Router();

const offerService = require("../services/offerService");
const { error } = require("../utils/errorMessages");

router.get("/", (req, res) => {
  res.render("search");
});

router.post("/", async (req, res) => {
  const { type } = req.body;

  try {
    if (type == "") {
      return res.redirect("/search");
    }

    const offers = await offerService.search(type);

    res.render("search", { offers, type, length: offers.length > 0 });
  } catch (err) {
    
    res.redirect("/search");
  }
});

module.exports = router;
