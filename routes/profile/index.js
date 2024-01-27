const express = require("express");
const commonEventsCreatedByUser = require("./common");
const { authenticateUser } = require("../../middleware/authenticate");
const companyEventsCreatedByUser = require("./company");
const router = express.Router();

router.post("/common", authenticateUser, commonEventsCreatedByUser);
router.post("/company", authenticateUser, companyEventsCreatedByUser);

module.exports = router;
