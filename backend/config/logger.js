const redis = require("redis");

let client;

async function connectRedis() {
  try {
    client = redis.createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    client.on("error", (err) => {
      console.error("❌ Redis Error:", err.message);
    });

    await client.connect();
    console.log("✅ Redis Connected");
  } catch (err) {
    console.error("❌ Redis Connection Failed:", err.message);
  }
}

connectRedis();

module.exports = client;
