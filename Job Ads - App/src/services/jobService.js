const Job = require("../models/Job");

exports.getFirstTree = () => Job.find().sort({ createdAt: 1 }).limit(3).lean();

exports.getAll = () => Job.find().lean();

exports.getOne = (_id) => Job.findOne({ _id }).populate("_ownerId").lean();

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

// exports.edit = (body, id) => {
//   const body = {};

//   return Play.findByIdAndUpdate(id, body, { runValidators: true });
// };

// exports.deleteItem = (id) => Play.findByIdAndDelete(id);

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
