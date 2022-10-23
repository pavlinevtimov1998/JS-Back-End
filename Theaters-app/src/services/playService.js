const Play = require("../models/Play");

exports.getOne = (playId) => Play.findById(playId);

exports.createPlay = (body) => {
  const playData = {
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    isPublic: body.isPublic == "on" ? true : false,
  };

  return Play.create(playData);
};
