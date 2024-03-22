const Sequelize = require('sequelize')
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

module.exports = Order;