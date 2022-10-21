const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");

exports.getAccessories = async (cubeId) => {
  const cube = await Cube.findById(cubeId).lean();

  return Accessory.find({ _id: { $nin: cube.accessories } }).lean();
};

exports.attach = async (cubeId, accessoryId) => {
  const [cube, accessory] = await Promise.all([
    Cube.findById(cubeId),
    Accessory.findById(accessoryId),
  ]);

  cube.accessories.push(accessoryId);
  accessory.cubes.push(cubeId);

  return Promise.all([cube.save(), accessory.save()]);
};
