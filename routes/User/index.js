const express = require("express");
const signup = require("./signup");
const login = require("./login");
const { myEventByInProgress, myEventByEnded, myEvent } = require("./myEvent");
const { authenticateUser } = require("../../middleware/authenticate");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/my/events/inprocess", authenticateUser, myEventByInProgress);
router.get("/my/events/ended", authenticateUser, myEventByEnded);
router.get("/myevent", authenticateUser, myEvent);

module.exports = router;
