const express = require("express");
const { createPool } = require("mysql2/promise");
// const redis = require("redis");
const app = express();
const pool = createPool({
  host: "mysql-service", // 10.99.134.202
  user: "root",
  password: "password",
  database: "app",
  port: 3310,
  connectTimeout: 100, // default connect timeout is 10 seconds
});
// Redis connection
// const redisClient = redis.createClient({
//   url: "redis://redis:6379",
// });
// (async () => {
//   try {
//     await redisClient.connect();
//     console.log("Connected to Redis server");
//   } catch (error) {
//     console.error("Error connecting to Redis:", error);
//     // You might want to exit the application or handle this error differently
//     process.exit(1);
//   }
// })();

app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // const cachedData = await redisClient.get(key);
    // if (cachedData) {
    //   console.log("Data retrieved from Redis cache");
    //   return res.json(JSON.parse(cachedData));
    // }

    console.log(`Fetching student with id: ${id}`);
    const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);
    if (rows.length > 0) {
      const rowData = rows[0];
      //   await redisClient.set(key, JSON.stringify(rowData), "EX", 3600); // Cache for 1 hour
      //   console.log("Data cached in Redis");
      return res.json(rowData);
    } else {
      return res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    console.error("Error stack:", error.stack);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
