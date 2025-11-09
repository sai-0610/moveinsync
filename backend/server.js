// const app = require("./app");
// console.log("Before dotenv:", process.env.MONGO_URL);

// const dotenv = require("dotenv");
// dotenv.config();

// console.log("After dotenv:", process.env.MONGO_URL);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("Backend running on port", PORT);
// });

const dotenv = require("dotenv");
dotenv.config(); // ✅ Load .env FIRST

console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
