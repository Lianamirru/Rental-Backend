const logger = require("../start/logging");

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);

  res.status(500).send("internal server error");
};
