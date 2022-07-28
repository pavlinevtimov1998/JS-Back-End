const Cube = require("../models/Cube");

exports.getCubes = (search = "", from, to) => {
  const cubes = Cube.find();

  return cubes;
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

// const [fromLevel, toLevel] = searchHelper(from, to);

// const result = cubes
//   .filter((c) =>
//     c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
//   )
//   .filter(
//     (c) =>
//       Number(c.difficultyLevel) >= fromLevel &&
//       Number(c.difficultyLevel) <= toLevel
//   );
