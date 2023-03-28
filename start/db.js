const mongoose = require("mongoose");
const config = require("config");

const logger = require("./logging");

module.exports = () => {
  const db = config.get("db");
  mongoose.connect(db).then(() => {
    logger.info(`Connected to ${db}...`);
  });
};
