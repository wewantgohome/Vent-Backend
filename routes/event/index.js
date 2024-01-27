const express = require("express");
const createEvent = require("./event");
const { authenticateUser } = require("../../middleware/authenticate");
const eventDetail = require("./detail");
const joinEvent = require("./join");
const { upload } = require("../../middleware/multer");
const { commonEvents, companyEvents, hello } = require("./getEvent.js");
const userEvents = require("./userEvent.js");
const router = express.Router();

router.post("/create", authenticateUser, upload.single("img"), createEvent);
router.get("/:id", authenticateUser, eventDetail);
router.post("/join/:eventId", authenticateUser, upload.single("img"),joinEvent);
router.post("/common", authenticateUser, commonEvents);
router.post("/company", authenticateUser, companyEvents);

router.post("/user", authenticateUser, userEvents)

module.exports = router;
