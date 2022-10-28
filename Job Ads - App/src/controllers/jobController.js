const router = require("express").Router();

const jobService = require("../services/jobService");
const { errorMessages } = require("../utils/errorMessages");

router.get("/catalog", async (req, res) => {
  try {
    const jobs = await jobService.getAll();

    res.render("catalog", {
      title: "Catalog Page",
      jobs,
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

router.post("/create", async (req, res) => {
  const body = req.body;
  const userId = req.user._id;

  try {
    await jobService.create(body, userId);

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.render("create", {
      body,
      error,
    });
  }
});

router.get("/details/:jobId", async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user._id;

  try {
    const job = await jobService.getOne(jobId);

    job.isOwner = job._ownerId._id.toString() == userId;
    job.isApplied = job.usersApplied.find((id) => id.toString() == userId)
      ? true
      : false;

    res.render("details", {
      title: "Details Page",
      job,
    });
  } catch (err) {
    res.render("/");
  }
});

router.get("/edit/:jobId", (req, res) => {
  res.render("catalog", {
    title: "Catalog Page",
  });
});

router.post("/edit/:jobId", (req, res) => {});

module.exports = router;
