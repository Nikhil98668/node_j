const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ispremiumuser: { type:Boolean, default: false },
    totalExpense:{type:Number,required:true,default:0}
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;























/*const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const UserModel = sequelize.define('usermodels',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ispremiumuser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

  
module.exports = UserModel;*/