const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

const {
  getAllVersions,
  restoreVersion,
} = require("../controllers/versionController");

// List all versions
router.get("/all", authenticate, getAllVersions);

// Restore old version
router.post("/restore/:id", authenticate, restoreVersion);

module.exports = router;
