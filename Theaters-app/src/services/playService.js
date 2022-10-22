const Play = require("../models/Play");

exports.createPlay = (body) => {
  const playData = {
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    isPublic: body.isPublic == "on" ? true : false,
  };

  return Play.create(playData);
};
