const express = require("express");
const createEvent = require("./event");
const { authenticateUser } = require("../../middleware/authenticate");
const eventDetail = require("./detail");
const joinEvent = require("./join");
const { upload } = require("../../middleware/multer");
const commonEvent = require("./main");
const router = express.Router();

router.post("/create", authenticateUser, upload.single("img"), createEvent);
router.get("/:id", eventDetail);
router.post("/join/:eventId", authenticateUser, joinEvent);
router.get("/common", authenticateUser, commonEvent);

module.exports = router;
