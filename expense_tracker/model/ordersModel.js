const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  paymentid: { type: String },
  orderid: { type: String },
  status: { type: String },
  usersTbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    onDelete: 'CASCADE'
  },
},
  { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
























/*const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Order = sequelize.define('order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      usersTbId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      orderid: Sequelize.STRING,
      amount:Sequelize.INTEGER,
      currency:Sequelize.STRING,
      status: Sequelize.STRING,
      orderDate: Sequelize.STRING
      
    
});

module.exports = Order;*/