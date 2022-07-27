const router = require("express").Router();

const { Cat } = require("../models/Cats");

router.get("/", async (req, res) => {
  const cats = await Cat.find().lean();

  res.render("home", { cats });
});

module.exports = router;
