const mongoose = require("mongoose");

const changeSchema = new mongoose.Schema({
  seatId: String,
  room: String,
  x: Number,
  y: Number,
});

const offlineChangeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    changes: [changeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("OfflineChange", offlineChangeSchema);
