/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have configured Sequelize

const TableField = sequelize.define('TableField', {
    fieldName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fieldType: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

TableField.createTable = async (tableName, fields) => {
    // Logic to create table with dynamic fields
    await sequelize.query(`CREATE TABLE ${tableName} (${fields.map(field => `${field.fieldName} ${field.fieldType}`).join(', ')})`);
};

module.exports = TableField;*/

const db = require('./config/database');

const TableField = {};

TableField.createTable = async (tableName, fields) => {
    const query = `CREATE TABLE ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ${fields.map(field => `${field.name} ${field.type}`).join(',')}
    )`;
    await db.query(query);
};

module.exports = TableField;

