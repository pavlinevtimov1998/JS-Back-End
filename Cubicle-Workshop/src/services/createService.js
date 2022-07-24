const fs = require("fs/promises");

const cubes = require("../db.json");

exports.save = (cube) => {
  cubes.push(cube);

  const data = JSON.stringify(cubes, "", 4);

  return fs.writeFile("src/db.json", data, { encoding: "utf-8" });
};
