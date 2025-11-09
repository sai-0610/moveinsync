const FloorPlan = require("../models/FloorPlan");
const OfflineChange = require("../models/OfflineChange");
const ConflictResolver = require("./ConflictResolver");

module.exports = {
  async syncChanges(userId, changes) {
    const latestPlan = await FloorPlan.findOne().sort({ createdAt: -1 });
    const serverSeats = latestPlan.seats;

    const conflict = ConflictResolver.detectConflict(changes, serverSeats);

    if (conflict) {
      return { conflict: true };
    }

    // If no conflict → merge directly
    changes.forEach((seat) => latestPlan.seats.push(seat));
    await latestPlan.save();

    await OfflineChange.create({ userId, changes });

    return { conflict: false };
  },
};
