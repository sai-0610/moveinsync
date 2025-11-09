const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const floorRoutes = require("./routes/floorRoutes");
const versionRoutes = require("./routes/versionRoutes");
const offlineRoutes = require("./routes/offlineRoutes");
const meetingRoutes = require("./routes/meetingRoomRoutes");

const app = express();

// ✅ DB connect AFTER dotenv, because server.js loaded dotenv first
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/floor", floorRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/offline", offlineRoutes);
app.use("/api/meeting", meetingRoutes);

module.exports = app;
