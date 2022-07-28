const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");

exports.getAccessories = () => Accessory.find();