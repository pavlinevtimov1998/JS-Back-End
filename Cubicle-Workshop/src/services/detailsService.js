const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");

exports.getDetailed = (cubeId) => Cube.findById(cubeId).populate("accessories");
