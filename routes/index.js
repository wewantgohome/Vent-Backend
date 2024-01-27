const express = require("express");
const userRouter = require("./user");
const businessRouter = require("./business");
const router = express.Router();

router.use("/user", userRouter);
router.use("/business", businessRouter);

module.exports = router;
