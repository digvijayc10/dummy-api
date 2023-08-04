const AppError = require("../utils/appError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 400, message: error.message });
  }
  return res
    .status(400)
    .json({ status: 400, message: error.message || "Internal Server Error" });
};

module.exports = errorHandler;
