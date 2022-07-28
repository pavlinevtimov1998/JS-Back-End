const mongoose = require("mongoose");

const databasePort = "mongodb://localhost:27017/Cubicle-Workshop";

exports.initialazeDatabase = () => mongoose.connect(databasePort);
