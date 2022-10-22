const Play = require("../models/Play");

exports.getPlaysForGuest = () =>
  Play.find({
    isPublic: true,
  })
    .sort({ countLikes: -1 })
    .limit(3);

exports.getAllPlays = () =>
  Play.find({ isPublic: true }).sort({ createdAt: -1 });
