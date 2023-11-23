const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres',
  port: 5432, // default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};