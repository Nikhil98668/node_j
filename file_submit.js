const http = require('http');
const fs=require('fs');
//const http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method=req.method;
    if(url==='/')
    {
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form><body>');
        res.write('</html>');
        return res.end();
    }
    //res.end('HI')
    if(url==='/message' && method=='POST')
    {
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log(chunk);
        });
        return req.on('end',()=>{
            const pars=Buffer.concat(body).toString();
            console.log(pars);
            const p=pars.split("=")[1];
            //fs.writeFileSync('message.txt',p);
            fs.writeFile('message.txt',p, err => {
                res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();

            });

        });

        
    }


});
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});