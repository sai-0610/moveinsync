const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

const {
  suggestRoom,
  bookRoom,
  getAllRooms,
} = require("../controllers/meetingRoomController");

// Get automatic recommendation
router.get("/suggest", authenticate, suggestRoom);

// Book a meeting room
router.post("/book", authenticate, bookRoom);

// List all rooms
router.get("/rooms", authenticate, getAllRooms);

module.exports = router;
