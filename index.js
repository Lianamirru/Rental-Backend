const express = require("express");
require("express-async-errors");
const cors = require("cors");
const config = require("config");

const logger = require("./start/logging");
require("./start/db")();
require("./start/validation")();

const app = express();

app.use(cors({ origin: "*" }));
require("./start/routes")(app);

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
}

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

module.exports = server;
