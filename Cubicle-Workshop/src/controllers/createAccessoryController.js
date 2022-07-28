const router = require("express").Router();
const accessoryService = require("../services/createAccessoryService");

router.get("/create", (req, res) => {
  res.render("accessory/create");
});

router.post("/create", async (req, res) => {
  const accessoryData = req.body;

  await accessoryService.create(accessoryData);

  res.redirect("/");
});

module.exports = router;
