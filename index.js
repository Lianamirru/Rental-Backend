const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

console.log(config.get("jwtPrivateKey"));
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const app = express();

require("./start/routes")(app);

const db = config.get("db");
mongoose.connect(db).then(() => {
  console.log(`Connected to ${db}...`);
});

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
