const MeetingRoom = require("../models/MeetingRoom");
const Version = require("../models/Version");

// Suggest best room
exports.suggestRoom = async (req, res) => {
  const participants = Number(req.query.participants);

  if (!participants || participants <= 0)
    return res.status(400).json({ message: "Invalid number" });

  const rooms = await MeetingRoom.find();

  const filtered = rooms.filter((r) => r.capacity >= participants);

  if (filtered.length === 0)
    return res.status(404).json({ message: "No rooms available" });

  // Simple scoring
  filtered.sort((a, b) => {
    const scoreA = a.capacity - participants + (a.lastUsedWeight || 0);
    const scoreB = b.capacity - participants + (b.lastUsedWeight || 0);
    return scoreB - scoreA; // descending
  });

  res.json({ room: filtered[0] });
};

// Book a room
exports.bookRoom = async (req, res) => {
  const { roomId } = req.body;

  const room = await MeetingRoom.findById(roomId);
  if (!room) return res.status(404).json({ message: "Room not found" });

  room.lastUsedWeight = (room.lastUsedWeight || 0) + 1;
  await room.save();

  res.json({ message: "Room booked successfully" });
};

// List all rooms
exports.getAllRooms = async (req, res) => {
  const rooms = await MeetingRoom.find();
  res.json(rooms);
};
