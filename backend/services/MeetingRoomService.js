const MeetingRoom = require("../models/MeetingRoom");

module.exports = {
  async getAllRooms() {
    return MeetingRoom.find();
  },

  async updateUsage(roomId) {
    const room = await MeetingRoom.findById(roomId);
    if (!room) return null;

    room.lastUsedWeight = (room.lastUsedWeight || 0) + 1;
    await room.save();
    return room;
  },
};
