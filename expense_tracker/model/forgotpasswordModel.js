const Sequelize = require('sequelize');
const sequelize =require('../utils/database')

const ForgotPassword = sequelize.define('forgotpassword_tb', {
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN, 
    usersTbId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }

});

module.exports = ForgotPassword;
