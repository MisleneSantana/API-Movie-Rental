CREATE TABLE IF NOT EXISTS movies (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
category VARCHAR(20) NOT NULL,
duration SMALLINT NOT NULL,
price SMALLINT NOT NULL);