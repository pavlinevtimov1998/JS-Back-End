const Job = require("../models/Job");
const { error } = require("../utils/errorMessages");

exports.getFirstTree = () => Job.find().sort({ createdAt: 1 }).limit(3).lean();

exports.getAll = () => Job.find().lean();

exports.getOne = (_id) => Job.findOne({ _id });

exports.create = (body, _ownerId) => {
  const job = {
    headline: body.headline,
    companyName: body.companyName,
    description: body.description,
    location: body.location,
    _ownerId,
  };

  return Job.create(job);
};

exports.edit = (body, _id, _ownerId) => {
  const job = {
    headline: body.headline,
    companyName: body.companyName,
    description: body.description,
    location: body.location,
  };

  return Job.findOneAndUpdate({ _id, _ownerId }, job, { runValidators: true });
};

exports.deleteJob = async (_id, _ownerId) => {
  const result = await Job.findOneAndDelete({ _id, _ownerId });

  if (!result) {
    throw error("Unuthorized!");
  }
};

exports.apply = async (_id, userId) => {
  const job = await Job.findOne({ _id });

  if (job.usersApplied.find((id) => id.toString() == userId)) {
    throw error("You are already applied for this job!");
  }

  if (job._ownerId.toString() == userId) {
    throw error("You can't apply for own post!");
  }

  return Job.findByIdAndUpdate(_id, {
    $push: { usersApplied: userId },
    $inc: { appliedCount: 1 },
  });
};

exports.search = ({ search }) => Job.find().populate("_ownerId").lean();

// exports.getSortedByLikes = () =>
// Play.find({ isPublic: true }).sort({ countLikes: -1 });

// exports.getSortedByDate = () =>
// Play.find({ isPublic: true }).sort({ createdAt: -1 });

// exports.likePlay = (playId, userId) =>
//   Play.findByIdAndUpdate(
//     playId,
//     { $push: { usersLikes: userId }, $inc: { countLikes: 1 } },
//     { new: true }
//   );
