const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

const { syncOfflineChanges } = require("../controllers/offlineController");

// Sync offline saved admin changes
router.post("/sync", authenticate, syncOfflineChanges);

module.exports = router;
