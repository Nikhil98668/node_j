/*console.log("hello world");
const fs=require('fs');
fs.writeFileSync('hello.txt','hello world');*/

const http = require('http');
const myName = "Nikhil";
const server = http.createServer((req, res) => {
    res.end(myName);
});
server.listen(4000, () => {
   console.log(`${myName}`);
});
