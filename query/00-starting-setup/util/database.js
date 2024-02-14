const mysql=require('mysql2');

const pool= mysql.createPool({

    host:'local',
    user:'root',
    database:'node-complete',
    password:'W7301@jqir#'
});

module.exports=pool.promise();