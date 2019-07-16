import "dotenv/config";
import { Pool } from "pg";
import { DB } from "../config/database";
const query = (text, params, isArr = false) => {
  const pool = new Pool({
    connectionString: DB
  });
  return new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then(response => {
        const { rows } = response;
        isArr ? resolve(rows) : resolve(rows[0]);
        pool.end();
      })
      .catch(err => {
        reject(err);
        pool.end();
      });
  });
};
const queryCreate = async (table, columns, values) => {
  const pool = new Pool({
    connectionString: DB
  });
  const queryString = `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING *;`;
  const { rows: Result } = await pool.query(queryString);
  return Result[0];
};
const querySignin = async (columns, condition) => {
  const pool = new Pool({
    connectionString: DB
  });
  const queryString = `SELECT ${columns} FROM users ${condition};`;
  const { rows } = await pool.query(queryString);
  return rows;
};
const findByOne =async (columns, condition) => {
  const pool = new Pool({
    connectionString: DB
  });
  const query = `SELECT ${columns} FROM property AS p,users as u ${condition};`;
  const { rows } = await pool.query(query);
  return rows;
};

const getProperties = async (columns,condition)=> {
  const pool = new Pool({
    connectionString: DB
  });
  const query = `SELECT ${columns} FROM property AS p,users as u ${condition};`;
  const { rows } = await pool.query(query);
  return rows;
}
const createTable = migrationText => {
  const pool = new Pool({
    connectionString: DB
  });
  return new Promise((resolve, reject) => {
    pool
      .query(migrationText)
      .then(response => {
        resolve(response);
        pool.end();
      })
      .catch(err => {
        reject(err);
        pool.end();
      });
  });
};

export default { query,getProperties, queryCreate, querySignin, createTable, findByOne };
