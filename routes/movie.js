const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/all", movieController.getAllMovies);
router.get("/", movieController.getPaginatedMovies);

module.exports = router;
