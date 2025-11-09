const mongoose = require("mongoose");

const meetingRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    floor: Number,
    lastUsedWeight: { type: Number, default: 0 }, // used for suggestion scoring
  },
  { timestamps: true }
);

module.exports = mongoose.model("MeetingRoom", meetingRoomSchema);
