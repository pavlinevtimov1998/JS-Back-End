const router = require("express").Router();

const jobService = require("../services/jobService");

const { errorMessages } = require("../utils/errorMessages");
const { isUser } = require("../middlewares/guards");

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

router.get("/create", isUser(), (req, res) => {
  res.render("create", {
    title: "Create Page",
  });
});

router.post("/create", isUser(), async (req, res) => {
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

router.get("/details/:jobId", isUser(), async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user?._id;

  try {
    const job = await jobService
      .getOne(jobId)
      .populate(["_ownerId", "usersApplied"])
      .lean();

    if (userId) {
      job.isOwner = job._ownerId._id.toString() == userId;
      job.isApplied = job.usersApplied.find(
        (user) => user._id.toString() == userId
      )
        ? true
        : false;
      job.user = true;
    }

    res.render("details", {
      title: "Details Page",
      job,
    });
  } catch (err) {
    res.render("/");
  }
});

router.get("/edit/:jobId", isUser(), async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user._id;

  try {
    const job = await jobService.getOne(jobId).lean();

    if (job._ownerId.toString() != userId) {
      return res.redirect("/");
    }

    res.render("edit", {
      title: "Edit Page",
      job,
    });
  } catch (err) {
    res.render("/");
  }
});

router.post("/edit/:jobId", isUser(), async (req, res) => {
  const body = req.body;
  const jobId = req.params.jobId;

  try {
    await jobService.edit(body, jobId);

    res.redirect("/jobs/details/" + jobId);
  } catch (err) {
    const error = errorMessages(err);

    res.render("create", {
      body,
      error,
    });
  }
});

router.get("/delete/:jobId", isUser(), async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user._id;

  try {
    await jobService.deleteJob(jobId, userId);

    res.redirect("/jobs/catalog");
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/apply/:jobId", isUser(), async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user._id;

  try {
    await jobService.apply(jobId, userId);

    res.redirect("/jobs/details/" + jobId);
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
