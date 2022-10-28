exports.errorMessages = (err) => {
  if (err.name == "CastError") {
    return { message: "Not Found!" };
  } else if (err.code == "11000") {
    const message = handleDuplicateError(err);

    return { message };
  } else if (err.name == "ValidationError") {
    const message = handleValidationaError(err);

    return { message };
  } else {
    return err;
  }
};

const handleValidationaError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  return `Incorrect input.${errors.join(" ")}`;
};

const handleDuplicateError = (err) => {
  let matched = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
  let value;

  if (matched) {
    value = matched[0];
  }

  return `Cannot duplicate this ${value}. Please try with different!`;
};

exports.error = (message) => {
  return {
    message,
  };
};
