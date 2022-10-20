const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");

exports.getAccessories = async (cubeId) => {
  const cube = await Cube.findById(cubeId).lean();

  return Accessory.find({ _id: { $nin: cube.accessories } }).lean();
};

exports.attach = async (cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId);
  const accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessoryId);
  accessory.cubes.push(cubeId);

  await cube.save();
  await accessory.save();
};
