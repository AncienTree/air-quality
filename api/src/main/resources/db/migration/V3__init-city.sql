-- Create model
CREATE TABLE city (
      id VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      region VARCHAR(255) NOT NULL,
      region_id VARCHAR(255),

      CONSTRAINT pk_city PRIMARY KEY (id)
);