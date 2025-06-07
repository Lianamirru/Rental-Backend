const express = require("express");
const seed = require("../seed");
const router = express.Router();

router.get("/seed", async (req, res) => {
  try {
    await seed();
    res.status(200).send("Seeding completed.");
  } catch (err) {
    res.status(500).send("Seeding failed: " + err.message);
  }
});

module.exports = router;
