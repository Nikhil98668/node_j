const Sequelize = require('sequelize')
const sequelize = require('../utils/database')


const ExpenseTrackerModel = sequelize.define('ExpenseTrackerModel',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    category:{
        type:Sequelize.STRING,
        allowNull: false
    },
    amountType:{
        type:Sequelize.STRING,
        defaultValue: 'expense'
    },
    usersTbId: {
        type: Sequelize.INTEGER,
        allowNull: false
        
}})

 

module.exports = ExpenseTrackerModel;