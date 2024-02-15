
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const path = require('path');



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'W7301@jqir#',
  database: 'node-complete' 
});


app.post('/api/users', (req, res) => {
  const { name, email, number } = req.body;
  const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  pool.query(sql, [name, email, number], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User inserted successfully');
      res.json({ message: 'User inserted successfully' });
    }
  });
});


app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error getting users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User deleted successfully');
      res.json({ message: 'User deleted successfully' });
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});