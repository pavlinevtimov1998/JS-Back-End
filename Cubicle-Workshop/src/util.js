exports.sessionName = "session";
exports.secret = "lihgo2l41121jblkjhvkl121k2hl1ih3vl";
exports.salt = 10;

exports.trimAll = (params) => {
  let arr = [];

  params.forEach((element) => {
    arr.push(element.trim());
  });

  return arr;
};

exports.validatePass = (password, rePass) => {
  if (password.length < 8) {
    throw {
      message: "Pasword should be at least 8 characters long!",
    };
  } else if (rePass !== undefined && password !== rePass) {
    throw {
      message: "Paswords don't match!",
    };
  }
};
