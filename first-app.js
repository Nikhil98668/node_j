/*console.log("hello world");
const fs=require('fs');
fs.writeFileSync('hello.txt','hello world');*/

const http = require('http');
/*const myName = "Nikhil";
const server = http.createServer((req, res) => {
    res.end(myName);
});*/
const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/home') {
        res.end('Welcome to About Us page');
    }
    else if (url === '/node') {
        res.end('Welcome to my Node.js project');
    }
    else {
        res.end('404 Not Found');
    }
});
server.listen(3000, () => {
    //console.log('Server is running on port 4000');
});
