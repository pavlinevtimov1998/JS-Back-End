exports.errorMessages = (errors) =>
  Object.values(errors).map((e) => {
    return { message: e.message };
  });

exports.error = (message) => {
  return {
    errors: {
      message,
    },
  };
};

exports.trimStr = (...arr) => arr.map((e) => e.trim());
