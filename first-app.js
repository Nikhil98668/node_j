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
        res.write('Welcome to About Us page');
        res.end();
    }
    else if (url === '/node') {
        res.write('Welcome to my Node.js project');
        res.end();
    }
    else {
        res.write('404 Not Found');
        res.end();
    }
});
server.listen(3000, () => {
    console.log('Server is running on port 4000');
});
