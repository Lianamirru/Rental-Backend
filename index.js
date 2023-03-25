const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const Joi = require("joi");
const Fawn = require("fawn");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const app = express();
app.use(cors());

Joi.objectId = require("joi-objectid")(Joi);

const db = config.get("db");
mongoose
  .connect(db)
  .then(() => {
    console.log(`Connected to ${db}...`);
  })
  .catch((err) => console.error("Could not connect to DB. " + err.message));

require("./start/routes")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
