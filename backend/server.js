import express from "express";
import cors from "cors";
import pg from "pg";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const { Pool } = pg;

const pgPool = new Pool({ connectionString: process.env.DB_URL });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pgPool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database", err);
  } else {
    console.log("Connected to PostgreSQL database");
    const exists = pgPool.query(
      "SELECT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'country_traffic')",
      async (err, res) => {
        if (err) {
          console.error("Error checking table existence", err);
        } else {
          if (res.rows[0].exists) {
            console.log("Table exists");
          } else {
            console.log("Table does not exist, creating it...");
            const sql = readFileSync("init.sql", "utf8");
            pgPool.query(sql, (err, res) => {
              if (err) {
                console.error("Error creating table", err);
              } else {
                console.log("Table created successfully");
              }
            });
          }
        }
      }
    );
  }
});

app.get("/traffic-countries", async (req, res) => {
  const cacheKey = "trafficData";
  try {
    console.log("Cant find data in cache. Starting the query...");
    const result = await pgPool.query(
      "SELECT id, country_name,vehicle_count FROM country_traffic"
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error("Error fetching traffic data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/vehicle-distribution/:id", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `vehicle_distribution_${id}`;
  try {
    console.log("Cant find data in cache. Starting the query...");
    const result = await pgPool.query(
      "SELECT traffic_id,vehicle_type, vehicle_count FROM vehicle_distribution WHERE traffic_id=$1",
      [id]
    );
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching vehicle distribution data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
