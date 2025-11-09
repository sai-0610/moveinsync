module.exports = {
  scoreRoom(room, participants) {
    const capacityScore = room.capacity - participants;
    const usageScore = room.lastUsedWeight || 0;

    // Combine weights (simple heuristic)
    return capacityScore + usageScore;
  },

  chooseBestRoom(rooms, participants) {
    let best = null;
    let bestScore = -Infinity;

    rooms.forEach((room) => {
      const score = this.scoreRoom(room, participants);
      if (score > bestScore) {
        bestScore = score;
        best = room;
      }
    });

    return best;
  },
};
