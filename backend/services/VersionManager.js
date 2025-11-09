const Version = require("../models/Version");
const FloorPlan = require("../models/FloorPlan");

module.exports = {
  async createVersion(floorPlanId, userId) {
    return Version.create({
      version: Date.now(),
      floorPlanId,
      updatedBy: userId,
    });
  },

  async restoreVersion(versionId, userId) {
    const version = await Version.findById(versionId);
    if (!version) return null;

    const oldPlan = await FloorPlan.findById(version.floorPlanId);

    return FloorPlan.create({
      filePath: oldPlan.filePath,
      seats: oldPlan.seats,
      restoredFrom: versionId,
      uploadedBy: userId,
    });
  },
};
