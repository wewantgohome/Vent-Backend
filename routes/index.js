const express = require("express");
const userRouter = require("./user");
const businessRouter = require("./business");
const eventRouter = require("./event");
const router = express.Router();

router.use("/user", userRouter);
router.use("/business", businessRouter);
router.use("/event", eventRouter);

module.exports = router;
