// models/expense.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'W7301@jqir#', {
    host: 'localhost',
    dialect: 'mysql'
});

const Expense = sequelize.define('Expense', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

module.exports = Expense;
