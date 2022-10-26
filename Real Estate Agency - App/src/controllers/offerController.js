const router = require("express").Router();

const offerService = require("../services/offerService");

const { isUser } = require("../middlewares/guards");
const { errorMessages } = require("../utils/errorMessages");

router.get("/create", isUser, (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const body = req.body;
  const userId = req.user._id;

  try {
    await offerService.create(body, userId);

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(400).render("create", {
      body,
      error,
    });
  }
});

router.get("details/:offerId", isUser, async (req, res) => {
  const offerId = req.params.offerId;
  const userId = req.user._id;

  try {
    const offer = await offerService.getOne(offerId).lean();

    const isOwner = created._ownerId == userId;

    res.render("details", { offer, isOwner });
  } catch (err) {
    const error = errorMessages(err);

    res.locals.error = error;

    res.status(404).redirect("/");
  }
});

router.get("/edit/:offerId", async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const offer = await offerService.getOne(offerId);

    res.render("edit", offer);
  } catch (err) {
    const error = errorMessages(err);

    res.locals.error = error;

    res.redirect("/");
  }
});

router.post("/edit/:offerId", async (req, res) => {
  const body = req.body;
  const offerId = req.params.offerId;

  try {
    await offerService.edit(body, offerId);

    res.redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).render("edit", {
      body,
      error,
    });
  }
});

router.get("/delete/:offerId", async (req, res) => {
  const id = req.params.id;

  try {
    await offerService.delItem(id);

    res.status(201).redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.locals.error = error;

    res.status(404).redirect("/");
  }
});

module.exports = router;
