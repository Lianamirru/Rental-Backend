const mongoose = require("mongoose");
const config = require("config");

const logger = require("./logging");

module.exports = async () => {
  const db = config.get("db");
  await mongoose.connect(db).then(() => {
    logger.info(`Connected to ${db}...`);
  });
};
