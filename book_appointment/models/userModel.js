// models/userModel.js
const db = require('../config/database');

exports.insertUser = async (userData) => {
    const query = 'INSERT INTO users SET ?';
    const [result] = await db.query(query, userData);
    return result.insertId;
};

exports.getAllUsers = async () => {
    const query = 'SELECT * FROM users';
    const [rows] = await db.query(query);
    return rows;
};

exports.deleteUser = async (userId) => {
    const query = 'DELETE FROM users WHERE id = ?';
    await db.query(query, userId);
};
