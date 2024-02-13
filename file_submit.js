const http = require('http');
//const http = require('http');
const app1=require('./app1.js');
const server = http.createServer(app1.r);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});