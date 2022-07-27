const router = require("express").Router();

const { Breed } = require("../models/Breeds");
const { Cat } = require("../models/Cats");

router.get("/add-breed", (req, res) => {
  res.render("addBreed");
});

router.post("/add-breed", async (req, res) => {
  const body = req.body;

  await Breed.create({ value: body.breed });

  res.redirect("/");
});

router.get("/add-cat", async (req, res) => {
  const breeds = await Breed.find().lean();

  res.render("addCat", { breeds });
});

router.post("/add-cat", async (req, res) => {
  const body = await req.body;

  await Cat.create(body);

  res.redirect("/");
});

module.exports = router;
