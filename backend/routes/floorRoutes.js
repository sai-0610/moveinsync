const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/uploadHandler");

const {
  uploadFloorPlan,
  updateSeat,
  getFloorPlan,
} = require("../controllers/floorController");

// Upload PDF/Image floor plan
router.post(
  "/upload",
  authenticate,
  upload.single("floorPlan"),
  uploadFloorPlan
);

// Edit seat-level data
router.post("/seat/update", authenticate, updateSeat);

// Get active floor plan (latest version)
router.get("/current", authenticate, getFloorPlan);

module.exports = router;
