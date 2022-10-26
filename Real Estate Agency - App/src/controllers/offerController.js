const router = require("express").Router();

const offerService = require("../services/offerService");

const { isUser } = require("../middlewares/guards");
const { errorMessages, error } = require("../utils/errorMessages");

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

router.get("/details/:offerId", async (req, res) => {
  const offerId = req.params.offerId;
  const userId = req.user?._id;

  try {
    const offer = await offerService.getOne(offerId);

    const isOwner = offer._ownerId == userId;
    const isRenting = offer.usersRented.find((user) => user._id == userId);
    const usersRenting = offer.usersRented.map((user) => user.name).join(" ,");

    res.render("details", {
      offer: offer,
      isOwner,
      isRenting,
      availableSpace: offer.availablePieces > 0,
      usersRenting,
    });
  } catch (err) {
    const error = errorMessages(err);

    res.locals.error = error;

    res.status(404).redirect("/");
  }
});

router.get("/edit/:offerId", isUser, async (req, res) => {
  const offerId = req.params.offerId;
  const userId = req.user._id;

  try {
    const offer = await offerService.getOne(offerId);

    if (offer._ownerId != userId) {
      throw error("Unauthorized!");
    }

    res.render("edit", { offer });
  } catch (err) {
    const error = errorMessages(err);
    console.log(error);
    res.locals.error = error;

    res.redirect("/");
  }
});

router.post("/edit/:offerId", async (req, res) => {
  const offer = req.body;
  const offerId = req.params.offerId;

  try {
    await offerService.edit(offer, offerId);

    res.redirect("/offer/details/" + offerId);
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).render("edit", {
      offer,
      error,
    });
  }
});

router.get("/delete/:offerId", async (req, res) => {
  const offerId = req.params.offerId;

  try {
    await offerService.deleteOffer(offerId);

    res.status(201).redirect("/");
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).redirect("/");
  }
});

router.get("/rent/:offerId", isUser, async (req, res) => {
  const offerId = req.params.offerId;
  const userId = req.user._id;

  try {
    await offerService.rent(offerId, userId);

    res.redirect("/offer/details/" + offerId);
  } catch (err) {
    const error = errorMessages(err);

    res.status(404).redirect("/");
  }
});

module.exports = router;
