const express = require("express");
const redis = require("redis");
const dbConnection = require("./helper/mysql");
const app = express();

// Redis connection
const redisClient = redis.createClient({
  socket: {
    host: "redis-service",
    port: 6379,
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis server");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
app.get("/students/:id", async (req, res) => {
  const key = req.params.id;
  try {
    // Retrieve data from Redis with error handling
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log("Data retrieved from Redis cache");
      return res.json(JSON.parse(cachedData));
    }
    const [rows] = await dbConnection.query("SELECT * FROM students WHERE id = ?", [
      key,
    ]);
    if (rows.length > 0) {
      const rowData = rows[0];
      await redisClient.set(key, JSON.stringify(rowData));
      console.log("Data cached in Redis");
      return res.json(rowData);
    } else {
      return res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).send("Internal Server Error");
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
