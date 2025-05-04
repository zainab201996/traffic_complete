import request from "supertest";
import { jest } from "@jest/globals";
import { app, pgPool } from "./app.js";
import server from "./server.js";

jest.mock("pg", () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mClient) };
});

describe("API test", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for open handles
  });

  it("should return all countries with traffic data", async () => {
    const dummyData = {
      rows: [{ id: 1, country_name: "USA", vehicle_count: 1000 }],
    };
    pgPool.query = jest.fn().mockResolvedValueOnce({ rows: dummyData.rows });
    const response = await request(app).get("/traffic-countries");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(dummyData.rows);
  });

  it("should return vehicle distribution for a specific country", async () => {
    const dummyData = {
      rows: [
        { traffic_id: 1, vehicle_type: "Car", vehicle_count: 500 },
        { traffic_id: 1, vehicle_type: "Truck", vehicle_count: 300 },
      ],
    };
    pgPool.query = jest.fn().mockResolvedValueOnce({ rows: dummyData.rows });
    const response = await request(app).get("/vehicle-distribution/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(dummyData.rows);
  });

  it("should return no data found error for vehicle distribution", async () => {
    pgPool.query = jest.fn().mockResolvedValueOnce({ rows: [] });
    const response = await request(app).get("/vehicle-distribution/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No data found" });
  });
});
