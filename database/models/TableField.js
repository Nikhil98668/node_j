const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Define the TableField model
const TableField = sequelize.define('tableField', {
  fieldName: {
    type: Sequelize.STRING
  },
  fieldType: {
    type: Sequelize.STRING // You can customize this to support various field types
  }
});

// Create table with dynamic fields
TableField.createTable = async (tableName, fields) => {
  try {
    // Define model for the table
    const Model = sequelize.define(tableName, fields);
    // Synchronize model with database to create table
    await Model.sync({ force: true });
    return { success: true, message: `Table ${tableName} created successfully` };
  } catch (error) {
    return { success: false, message: 'Failed to create table', error: error.message };
  }
};

module.exports = TableField;
