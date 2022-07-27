const { appendFile } = require("fs");

const router = require("express").Router();

router.get("/add-breed", (req, res) => {
  res.render("addBreed");
});

router.get("/add-cat", (req, res) => {
  res.render("addCat");
});

module.exports = router;
