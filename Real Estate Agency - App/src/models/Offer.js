const mongoose = require("mongoose");

/*
⦁	Name - string (required),
⦁	Type - string (“Apartment”, “Villa”, “House”) required,
⦁	Year - number (required),
⦁	City – string (required),
⦁	Home Image - string (required),
⦁	Property Description - string (required),
⦁	Available pieces - number(required)
⦁	Rented a home - a collection of Users (reference to the User model)
⦁	Owner - object Id (reference to the User model)
 */

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      // unique: true,
    },
    type: {
      type: String,
      enum: ["Apartment", "Villa", "House"],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: [60, "Description should be maximum 60 characters!"],
    },
    imageUrl: {
      type: String,
      trim: true,
      required: true,
    },
    availablePieces: {
      type: String,
      required: true,
      min: [0, "Available pieces should be at least 0!"],
      max: [10, "Available pieces should be at maximum of 10!"],
    },
    _ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usersRented: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "User",
      },
    ],
  },

  { timestamps: { createdAt: "createdAt" } }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
