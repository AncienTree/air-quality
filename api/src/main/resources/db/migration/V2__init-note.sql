-- Create sequence
CREATE SEQUENCE note_seq START WITH 1 INCREMENT BY 1;

-- Create model
CREATE TABLE note (
    id BIGINT NOT NULL DEFAULT nextval('note_seq'),
    city_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT pk_note PRIMARY KEY (id)
);