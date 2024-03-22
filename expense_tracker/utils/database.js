/*const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect: 'mysql',
    logging: true,     
    host:process.env.DB_HOST
});      

module.exports = sequelize;*/
const mongoose= require("mongoose");


const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Server connect to mongoose Db`);
    }
    catch(error){
        console.log(error)
    }
}

module.exports =connectDB;