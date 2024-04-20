const express = require("express");
const redis = require("redis");

const app = express();
const redisClient = redis.createClient({
  host: "redis-service",
  port: 6379,
});

redisClient.on("error", function (error) {
    console.log("Redis Client Error: " + error);
});

app.get("/", async (req, res) => {
    const key = "counter";
    redisClient.get(key, (err, counter) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        res.send(`Counter: ${counter}`);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
