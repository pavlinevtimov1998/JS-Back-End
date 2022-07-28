const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");

exports.getAccessories = () => Accessory.find();

exports.attach = async (cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId);
  const accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessoryId);
  accessory.cubes.push(cubeId);

  await cube.save();
  await accessory.save();
};
