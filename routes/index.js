const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const movieRoutes = require("./movie");

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);
module.exports = router;
