const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema(
  {
    version: Number, // timestamp-based version ID
    floorPlanId: { type: mongoose.Schema.Types.ObjectId, ref: "FloorPlan" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Version", versionSchema);
