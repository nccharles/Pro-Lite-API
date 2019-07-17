CREATE TABLE
IF NOT EXISTS property(
    id SERIAL PRIMARY KEY NOT NULL,
    owner INTEGER REFERENCES users(id) NOT NULL,
    status VARCHAR(100) DEFAULT 'Available',
    price FLOAT NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address text NOT NULL,
    type VARCHAR(200) NOT NULL,
    created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    image_url text NOT NULL
  );