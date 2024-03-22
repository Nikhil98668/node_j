const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema({
  active: {
    type:Boolean,
  },
  usersTbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    onDelete: 'CASCADE'
  },
},
  { timestamps: true });

const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);
module.exports = ForgotPassword;














/*const Sequelize = require('sequelize');
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

module.exports = ForgotPassword;*/
