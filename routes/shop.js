const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router=express.Router();

router.use('/use',(req,res,next)=>{
    //console.log("Another Middleware");
    //res.send("HIII");
    res.send('<h1> hello to node js </h1>') 
});
module.exports=router;