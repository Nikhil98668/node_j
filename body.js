const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="name"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res) => {
    console.log(req.body.name); 
    res.redirect('/'); 
});
app.use('/',(req,res,next)=>{
    //console.log("Another Middleware");
    //res.send("HIII");
    res.send('<h1> hello to node js </h1>') 
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
