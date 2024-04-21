const express = require("express");
// const redis = require("redis");
const dbConnection = require("./helper/mysql");
const app = express();

// const redisClient = redis.createClient({
//     host: "redis://redis-service:6379",
//     port: 6379,
// });

// const redisClient = redis.createClient({
//   url: "redis://10.244.0.234:6379",
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.connect();
// app.get('/', async (req, res) => {
//     const key = "counter";
//     try {
//         let counter = await redisClient.getAsync(key);
//         res.send(`Counter: ${counter}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// redisClient.on("error", (err) => console.log("Redis Client Error", err));

// (async () => {
//   try {
//     await redisClient.connect();
//     console.log("Connected to Redis server");
//   } catch (error) {
//     console.error("Error connecting to Redis:", error);
//   }
// })();

app.get("/students", (req, res) => {
  dbConnection.query("SELECT * FROM students", (err, results, fields) => {
    if (err) {
      console.log("Database query error: ", err);
    } else {
      res.status(200).json({
        status: "success",
        data: results,
      });
    }
  });
});

app.post("/students/add/:name/:age/:midterm_grade/:final_grade", (req, res) => {
  dbConnection.query(
    "INSERT INTO students (name, age, midterm_grade, final_grade) VALUES (?, ?, ?, ?)",
    [
      req.params.name,
      req.params.age,
      req.params.midterm_grade,
      req.params.final_grade,
    ],
    (err, results, fields) => {
      if (err) {
        console.log("Database query error: ", err);
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    }
  );
});

app.get("/students/add/:name/:age/:midterm_grade/:final_grade", (req, res) => {
  dbConnection.query(
    "INSERT INTO students (name, age, midterm_grade, final_grade) VALUES (?, ?, ?, ?)",
    [
      req.params.name,
      req.params.age,
      req.params.midterm_grade,
      req.params.final_grade,
    ],
    (err, results, fields) => {
      if (err) {
        console.log("Database query error: ", err);
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    }
  );
});

app.delete("/students/delete/:id", (req, res) => {
  dbConnection.query(
    "DELETE FROM students WHERE id = ?",
    [req.params.id],
    (err, results, fields) => {
      if (err) {
        console.log("Database query error: ", err);
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    }
  );
});

app.get("/students/delete/:id", (req, res) => {
  dbConnection.query(
    "DELETE FROM students WHERE id = ?",
    [req.params.id],
    (err, results, fields) => {
      if (err) {
        console.log("Database query error: ", err);
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    }
  );
});

app.get("/students/average/:id", (req, res) => {
  dbConnection.query(
    "SELECT (midterm_grade + final_grade) / 2 AS average_grade FROM students WHERE id = ?",
    [req.params.id],
    (err, results, fields) => {
      if (err) {
        console.log("Database query error: ", err);
      } else {
        const averageGrade = parseFloat(results[0].average_grade).toFixed(2);
        res.status(200).json({
          status: "success",
          // data: results,
          data: {
            average_grade: averageGrade,
          },
        });
      }
    }
  );
});

app.get("/students/:id", (req, res) => {
  dbConnection.query(
    "SELECT * FROM students WHERE id = ?",
    [req.params.id],
    (err, results, fields) => {
      if (err) {
        console.log("Database query error: ", err);
      } else {
        res.status(200).json({
          status: "success",
          data: results,
        });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
