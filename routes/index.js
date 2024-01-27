const express = require("express");
const userRouter = require("./user");
const businessRouter = require("./business");
const eventRouter = require("./event");
const profileRouter = require("./profile");
const router = express.Router();

router.use("/user", userRouter);
router.use("/business", businessRouter);
router.use("/event", eventRouter);
router.use("/profile", profileRouter);

module.exports = router;
