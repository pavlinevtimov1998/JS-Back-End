const router = require("express").Router();

const createService = require("../services/createService");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const cube = req.body;

  await createService.create(cube);

  res.redirect("/");
});

module.exports = router;
