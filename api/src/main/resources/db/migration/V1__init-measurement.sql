-- Create sequence
CREATE SEQUENCE measurement_seq START WITH 1 INCREMENT BY 1;

-- Create model
CREATE TABLE measurement (
    id BIGINT NOT NULL DEFAULT nextval('measurement_seq'),
    sensor_id VARCHAR(255),
    city_id VARCHAR(255),
    pm10 DOUBLE PRECISION,
    co DOUBLE PRECISION,
    no2 DOUBLE PRECISION,
    measured_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT pk_measurement PRIMARY KEY (id)
);