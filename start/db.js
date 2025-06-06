const mongoose = require("mongoose");
const config = require("config");

const logger = require("./logging");
const { seed } = require("../seed");

module.exports = async () => {
  const db = config.get("db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connect(db).then(() => {
    logger.info(`Connected to ${db}...`);
  });

  const categoriesCount = await Category.countDocuments();
  if (categoriesCount === 0) {
    await seed();
  }
};
