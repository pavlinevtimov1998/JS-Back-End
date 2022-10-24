const Play = require("../models/Play");

exports.getOne = (playId) => Play.findById(playId);

exports.createPlay = (body, userId) => {
  const playData = {
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    isPublic: body.isPublic == "on" ? true : false,
    _ownerId: userId,
  };

  return Play.create(playData);
};

exports.editPlay = (body, playId) => {
  const playData = {
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    isPublic: body.isPublic == "on" ? true : false,
  };

  return Play.findByIdAndUpdate(playId, playData, { runValidators: true });
};

exports.likePlay = (playId, userId) =>
  Play.findByIdAndUpdate(
    playId,
    { $push: { usersLikes: userId } },
    { new: true }
  );

exports.deletePlay = (playId) => Play.findByIdAndDelete(playId);
