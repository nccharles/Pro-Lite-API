import db from "../database";
const userMigration = `CREATE TABLE
IF NOT EXISTS users
( id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    address VARCHAR(30) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
  );`;
(() => {
  db.createTable(userMigration)
    .then(response => {
      console.log("users table created");
      return;
    })
    .catch(err => {
      console.log(err);
      return;
    });
})();
