const Cube = require("../models/Cube");

exports.getCubes = async (search = "", from, to) => {
  const [fromLevel, toLevel] = searchHelper(from, to);

  const cubes = await Cube.find().lean();

  const result = cubes
    .filter((c) =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter(
      (c) =>
        Number(c.difficultyLevel) >= fromLevel &&
        Number(c.difficultyLevel) <= toLevel
    );

  return result;
};

const searchHelper = (from, to) => {
  if (from == undefined || from == "") {
    from = 0;
  }

  if (to == undefined || to == "") {
    to = 6;
  }

  return [Number(from), Number(to)];
};
