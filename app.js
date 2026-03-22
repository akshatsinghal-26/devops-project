const express = require("express");
const mysql = require("mysql2");

const app = express();

let db; // make it global so you can use it elsewhere

function connectWithRetry() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,       // service name from docker-compose
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false
  });

  db.connect((err) => {
    if (err) {
      console.log("DB not ready, retrying in 3s...");
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("Connected to MySQL");
    }
  });
}

connectWithRetry();

app.get("/", (req, res) => {
  res.send("App + DB connected 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
})
