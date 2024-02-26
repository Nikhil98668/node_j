// db.js
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'W7301@jqir#',
  database: 'node-complete'
});

module.exports = connection;
