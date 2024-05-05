const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");

router.get("/all", usersController.getAllUser);
router.get("/", usersController.getPaginatedUser);

module.exports = router;
