import "dotenv/config";
import { Pool } from "pg";
import { DB } from "../config/database";
import { serverFeedback } from "../helpers/Feedback";
const pool = new Pool({
  connectionString: DB
});
const query = (text, params, isArr = false) => {

  return new Promise(async (resolve, reject) => {
    pool
      .query(text, params)
      .then(async  response => {
        const { rows } = response;
        isArr ? resolve(rows) : resolve(rows[0]);
        pool.end()
      })
      .catch(async err => {
        reject(err);
        pool.end()
      });
  });
};
const checkProperty = async (res, userId, proId) => {
  const prop = `SELECT id FROM property WHERE id =${proId} ;`;
  if (!(await pool.query(prop)).rows[0]) { return serverFeedback(res, 404, ...['status', 404, 'error', `This Property not fund!`]); }

  const proOwner = `SELECT owner FROM property WHERE owner = ${userId} AND id =${proId} ;`;
  if (!(await pool.query(proOwner)).rows[0]) return serverFeedback(res, 401, ...['status', 401, 'error', `Unauthorized: This property is not yours`]);

}
const queryCreate = async (table, columns, values) => {

  const queryString = `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING *;`;
  const { rows: Result } = await pool.query(queryString);
  return Result[0];
};
const querySignin = async (columns, condition) => {

  const queryString = `SELECT ${columns} FROM users ${condition};`;
  const { rows } = await pool.query(queryString);
  return rows;
};
const findByOne = async (columns, condition) => {

  const query = `SELECT ${columns} FROM property AS p,users as u ${condition};`;
  const { rows } = await pool.query(query);
  return rows;
};


const deleteProperty = async (res, userId, proId) => {
  checkProperty(res, userId, proId)
  const queryString = `DELETE FROM property WHERE owner = ${userId} AND id =${proId};`;
  await pool.query(queryString);
  return serverFeedback(res, 200, ...['status', 200, 'message', 'Deleted Successfully!']);
}

const updateProperty = async (res, columns, userId, proId) => {
  checkProperty(res, userId, proId)
  const query = `UPDATE property SET ${columns} WHERE owner = ${userId} AND id =${proId} RETURNING *;`;
  const { rows } = await pool.query(query);
  return serverFeedback(res, 200, ...['status', 200, 'message', 'Updated Successfully', 'data', rows[0]]);
};

const markSold = async (res, userId, proId) => {
  checkProperty(res, userId, proId)
  const query = `UPDATE property SET status='Sold' WHERE owner = ${userId} AND id =${proId} RETURNING *;`;
  const { rows } = await pool.query(query);
  return serverFeedback(res, 200, ...['status', 200, 'message', 'Marked as Sold!', 'data', rows[0]]);
};

const getProperties = async (columns, condition) => {

  const query = `SELECT ${columns} FROM property as p, users as u ${condition};`;
  const { rows } = await pool.query(query);
  return rows;
}

export default { query, markSold, getProperties, updateProperty, deleteProperty, queryCreate, querySignin, findByOne };
