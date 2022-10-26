const mongoose = require("mongoose");

const { DATABASE_URL } = require("../constants");

exports.initDB = async () => {
  return mongoose
    .connect(DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB successfully connected!");
    })
    .catch((err) => {
      console.log("DATABASE ERROR!");
      console.log(err.message);
      process.exit(1);
    });
};
