const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      // maxLength: [50, "Description should be maximum 50 characters!"],
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    _ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usersApplied: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "User",
      },
    ],
    appliedCount: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: { createdAt: "createdAt" } }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
