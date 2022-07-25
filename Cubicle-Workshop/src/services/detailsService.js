const cubes = require("../db.json");

exports.getOne = (cubeId) => cubes.find((c) => c._id == cubeId);
