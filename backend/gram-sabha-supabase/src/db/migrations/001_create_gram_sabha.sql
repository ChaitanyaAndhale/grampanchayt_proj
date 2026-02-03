CREATE TABLE gram_sabha_records (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    date DATE NOT NULL,
    members_present INT NOT NULL,
    members_absent INT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);