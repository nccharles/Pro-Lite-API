import { DB } from "../config/database";
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: DB
});

const dropping = async () => {
  const userMigration = `DROP TABLE IF EXISTS users CASCADE`;
  const proMigration = `DROP TABLE IF EXISTS property CASCADE`;
  try {
    await pool.query(userMigration);
    await pool.query(proMigration);
    return 'Tables dropped';
  } catch (err) {
    return `${err}, Dropped failed`;
  }
};
const usersTable = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
  );`;
const propertyTable = `CREATE TABLE property(
    id SERIAL PRIMARY KEY NOT NULL,
    owner INTEGER REFERENCES users(id) NOT NULL,
    status VARCHAR(80) DEFAULT 'available',
    price FLOAT NOT NULL,
    state VARCHAR(80) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address text NOT NULL,
    type VARCHAR(255) NOT NULL,
    created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    image_url text NOT NULL
  );`;
const createAllTables = async () => {
  try {
    await pool.query(usersTable);
    await pool.query(propertyTable);
    return 'created'
  } catch (err) {
    return `creation failed`;
  }
};

const propertyProTables = async () => {
  await dropping();
  await createAllTables();
  await process.exit(0);
};
propertyProTables();

