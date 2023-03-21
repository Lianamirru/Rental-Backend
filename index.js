const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

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
