module.exports = {
  capacityScore(room, participants) {
    return room.capacity - participants;
  },

  usageScore(room) {
    return room.lastUsedWeight || 0;
  },

  totalScore(room, participants) {
    return this.capacityScore(room, participants) + this.usageScore(room);
  },
};
