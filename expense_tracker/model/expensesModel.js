const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    amountType:{
        type: String,
        default: 'expense'
    },
    usersTbId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        onDelete: 'CASCADE'
  }
},
  { timestamps: true }
  )

 
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
























/*const Sequelize = require('sequelize')
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

 

module.exports = ExpenseTrackerModel;*/