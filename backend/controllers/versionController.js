const Version = require("../models/Version");
const FloorPlan = require("../models/floorPlan");

// List all versions
exports.getAllVersions = async (req, res) => {
  const versions = await Version.find().sort({ version: -1 });
  res.json(versions);
};

// Restore previous floor version
exports.restoreVersion = async (req, res) => {
  const versionId = req.params.id;
  const version = await Version.findById(versionId);

  if (!version) return res.status(404).json({ message: "Version not found" });

  const floorPlan = await FloorPlan.findById(version.floorPlanId);

  await FloorPlan.create({
    filePath: floorPlan.filePath,
    seats: floorPlan.seats,
    restoredFrom: version._id,
    uploadedBy: req.user.id,
  });

  await Version.create({
    version: Date.now(),
    floorPlanId: floorPlan._id,
    updatedBy: req.user.id,
  });

  res.json({ message: "Version restored successfully" });
};
