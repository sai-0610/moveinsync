const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");

require("dotenv").config();

// Models
const User = require("../models/Users");
const MeetingRoom = require("../models/MeetingRoom");
const FloorPlan = require("../models/floorPlan");

// Load JSON
function loadJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");

    // Clear old data
    await User.deleteMany();
    await MeetingRoom.deleteMany();
    await FloorPlan.deleteMany();

    // Seed Users
    const users = loadJSON("db/seed/users.json");
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
      await User.create(user);
    }
    console.log("✅ Users seeded");

    // Seed Rooms
    const rooms = loadJSON("db/seed/rooms.json");
    await MeetingRoom.insertMany(rooms);
    console.log("✅ Meeting rooms seeded");

    // Seed FloorPlan
    const floor = loadJSON("db/seed/sampleFloor.json");
    const createdFloor = await FloorPlan.create(floor);
    console.log("✅ Floor plan seeded");

    // Add sample seats
    const seats = loadJSON("db/seed/sampleSeats.json");
    createdFloor.seats = seats;
    await createdFloor.save();
    console.log("✅ Sample seats added");

    console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seedDatabase();
