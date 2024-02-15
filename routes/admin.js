const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router=express.Router();

//router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product', (req, res) => {
    res.send('<form action="/product" method="POST"><input type="text" name="name"><button type="submit">Add Product</button></form>');
});

router.post('/product', (req, res) => {
    console.log(req.body.name); 
    res.redirect('/'); 
});
/*router.use('/',(req,res,next)=>{
    //console.log("Another Middleware");
    //res.send("HIII");
    res.send('<h1> hello to node js </h1>') 
});*/
module.exports=router;

