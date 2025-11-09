const mongoose = require("mongoose");

// Seat structure inside the floor plan
const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true },
  room: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

// Floor Plan schema
const floorPlanSchema = new mongoose.Schema(
  {
    filePath: { type: String, required: true }, // uploaded PDF/image path
    seats: [seatSchema], // list of seat objects
    restoredFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Version",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ✅ FIX: model name MUST be unique
module.exports = mongoose.model("FloorPlan", floorPlanSchema);
