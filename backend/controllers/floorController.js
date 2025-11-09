const FloorPlan = require("../models/floorPlan");
const Version = require("../models/Version");

// Upload floor plan (PDF/Image)
exports.uploadFloorPlan = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const newPlan = await FloorPlan.create({
    filePath: req.file.path,
    uploadedBy: req.user.id,
  });

  await Version.create({
    version: Date.now(),
    floorPlanId: newPlan._id,
    updatedBy: req.user.id,
  });

  res.json({ message: "Floor plan uploaded", planId: newPlan._id });
};

// Update seat-level data
exports.updateSeat = async (req, res) => {
  const { seatId, room, x, y } = req.body;

  if (!seatId || !room) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const plan = await FloorPlan.findOne().sort({ createdAt: -1 });

  plan.seats.push({ seatId, room, x, y });
  await plan.save();

  res.json({ message: "Seat updated" });
};

// Get latest floor plan
exports.getFloorPlan = async (req, res) => {
  const latest = await FloorPlan.findOne().sort({ createdAt: -1 });
  res.json(latest);
};
