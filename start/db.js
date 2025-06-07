const mongoose = require("mongoose");
const config = require("config");

const logger = require("./logging");
const { seed } = require("../seed");
const { Category } = require("../models/category");

module.exports = async () => {
  const db = config.get("db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoose.connect(db).then(() => {
    logger.info(`Connected to ${db}...`);
  });

  const categoriesCount = await Category.countDocuments();
  logger.info(`Categories count: ${categoriesCount}`);
  if (categoriesCount === 0) {
    await seed();
  }
};
