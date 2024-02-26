const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'W7301@jqir#', {
    host: 'localhost',
    dialect: 'mysql'
});