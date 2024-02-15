/*const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', // Corrected host
    user: 'root',
    database: 'node-complete',
    password: 'W7301@jqir#'
});

module.exports = pool.promise();*/

const Sequelize = require('sequelize');

const sequelize=new Sequelize('node-complete','root','W7301@jqir#',{dialect: 'mysql',host:'localhost'});


module.exports=sequelize;