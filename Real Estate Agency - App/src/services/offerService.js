// const Play = require("../models/Play");

exports.getOne = (id) => Play.findOne({ _id: id });

exports.create = (body, userId) => {
  const body = {};

  // return Play.create(body);
};

exports.editPlay = (body, id) => {
  const body = {};

  return Play.findByIdAndUpdate(id, body, { runValidators: true });
};

exports.deletePlay = (id) => Play.findByIdAndDelete(id);

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
