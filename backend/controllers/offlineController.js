const OfflineChange = require("../models/OfflineChange");
const FloorPlan = require("../models/floorPlan");

exports.syncOfflineChanges = async (req, res) => {
  const { changes } = req.body;

  if (!changes || !Array.isArray(changes)) {
    return res.status(400).json({ message: "Invalid changes" });
  }

  const plan = await FloorPlan.findOne().sort({ createdAt: -1 });

  changes.forEach((change) => {
    plan.seats.push(change);
  });

  await plan.save();

  await OfflineChange.create({
    userId: req.user.id,
    changes,
  });

  res.json({ message: "Offline changes synced" });
};
