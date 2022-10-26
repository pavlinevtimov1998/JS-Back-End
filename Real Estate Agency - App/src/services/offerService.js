const Offer = require("../models/Offer");

exports.getLastTreeOffers = () =>
  Offer.find({})
    .sort({ createdAt: -1 })
    .select(
      "-type -city -availablePieces -description -year -usersRented -updatedAt -createdAt -__v"
    )
    .limit(3)
    .lean();

exports.getAll = () => Offer.find().lean();

exports.getOne = (offerId) =>
  Offer.findById(offerId).populate("usersRented").lean();

exports.create = (body, userId) => {
  const offerData = {
    name: body.name,
    type: body.type,
    city: body.city,
    availablePieces: Number(body.availablePieces),
    imageUrl: body.imageUrl,
    description: body.description,
    year: body.year,
    _ownerId: userId,
  };

  return Offer.create(offerData);
};

exports.edit = (body, offerId) => {
  const offerData = {
    name: body.name,
    type: body.type,
    city: body.city,
    availablePieces: Number(body.availablePieces),
    imageUrl: body.imageUrl,
    description: body.description,
    year: body.year,
  };

  return Offer.findByIdAndUpdate(offerId, offerData, { runValidators: true });
};

exports.deleteOffer = (offerId) => Offer.findByIdAndDelete(offerId);

exports.rent = (offerId, userId) =>
  Offer.findByIdAndUpdate(
    offerId,
    { $push: { usersRented: userId }, $inc: { availablePieces: -1 } },
    { new: true }
  );

exports.search = (type) =>
  Offer.find({ type: { $regex: `^${type}`, $options: "$i" } }).lean();
