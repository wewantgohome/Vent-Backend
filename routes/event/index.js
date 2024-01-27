const express = require("express");
const createEvent = require("./event");
const { authenticateUser } = require("../../middleware/authenticate");
const router = express.Router();

router.post("/create", authenticateUser,createEvent);

module.exports = router;
