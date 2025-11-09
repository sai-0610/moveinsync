const redis = require("../config/redis");

module.exports = {
  async set(key, value, ttl = 60) {
    try {
      await redis.set(key, JSON.stringify(value), { EX: ttl });
    } catch {
      console.log("Redis set failed");
    }
  },

  async get(key) {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
};
