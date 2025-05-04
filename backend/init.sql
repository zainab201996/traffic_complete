CREATE TABLE IF NOT EXISTS country_traffic(
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(255) NOT NULL,
    vehicle_count INT NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicle_distribution(
    id SERIAL PRIMARY KEY,
    traffic_id INT REFERENCES country_traffic(id), 
    vehicle_type VARCHAR(255) NOT NULL, 
    vehicle_count INT NOT NULL);

INSERT INTO country_traffic(country_name, vehicle_count) VALUES
('Pakistan', 1000),
('UAE', 500),
('Turkey', 300),
('China', 700),
('UK', 400);

INSERT INTO vehicle_distribution(traffic_id, vehicle_type, vehicle_count) VALUES
(1, 'Car', 600),
(1, 'Truck', 200),
(1, 'Bus', 200),
(2, 'Car', 300),
(2, 'Truck', 200),
(3, 'Car', 150),
(3, 'Truck', 100),
(3, 'Motorcycle', 50),
(4, 'Car', 400),
(4, 'Truck', 300),
(5, 'Car', 250),
(5, 'Truck', 150);