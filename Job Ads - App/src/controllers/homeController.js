const router = require("express").Router();

const jobService = require("../services/jobService");

router.get("/", async (req, res) => {
  const jobs = await jobService.getFirstTree();

  res.render("home", {
    title: "Home Page",
    jobs,
  });
});

module.exports = router;
