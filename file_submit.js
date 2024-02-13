const http = require('http');

const express = require('express');

const app = express();

app.use((req,res,next)=>{
console.log("Middleware");
next();
});
app.use((req,res,next)=>{
    console.log("Another Middleware");
    //res.send("HIII");
    res.send('<h1> hello to node js </h1>') 
});


//const app1=require('./app1.js');

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port 3000');

});