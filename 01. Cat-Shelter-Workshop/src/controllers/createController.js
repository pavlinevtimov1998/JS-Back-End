const router = require("express").Router();

const { Breed } = require("../models/Breeds");

router.get("/add-breed", (req, res) => {
  res.render("addBreed");
});

router.get("/add-cat", async (req, res) => {
  const breeds = await Breed.find().lean();

  console.log(breeds);

  res.render("addCat", { breeds });
});

module.exports = router;
