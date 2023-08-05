require("dotenv").config(); // Needed to seed data
const mysql = require("mysql2/promise");

if (!process.env.DATABASE_URL)
  throw new Error(".env variable 'DATABASE_URL' must be set");

let pool;

if (process.env.NODE_ENV === "production") {
  pool = mysql.createPool(process.env.DATABASE_URL);
} else {
  if (!global.__dbPool__) {
    global.__dbPool__ = mysql.createPool(process.env.DATABASE_URL);
  }
  pool = global.__dbPool__;
}

// Test connection
async function mysqlConnect() {
  const pool = mysql.createPool(process.env.DATABASE_URL);
  const config = pool.pool.config.connectionConfig;
  try {
    console.log(`- Connected to ${config.database} on ${config.host}`);
  } catch (error) {
    throw new Error(error);
  }
}

// Query function
// const { rows, fields, duration } = await query(`SELECT NOW()`);
async function query(sql) {
  const start = Date.now();
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.query(sql);
    const duration = Date.now() - start;
    return { rows, fields, duration };
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.release();
  }
}

// Execute function
// const { rows, fields, duration } = await execute("SELECT * FROM posts WHERE id = ?", [id]);
async function execute(sql, params) {
  const start = Date.now();
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.execute(sql, params);
    const duration = Date.now() - start;
    return { rows, fields, duration };
  } catch (error) {
    throw new Error(error);
  } finally {
    connection.release();
  }
}

module.exports = { mysqlConnect, query, execute };
