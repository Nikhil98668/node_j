const jwt = require('jsonwebtoken')
const User = require('../model/usersModel')
require('dotenv').config();

const secret = process.env.JWT_SECRET_KEY;



exports.authenticate =async (req,res,next)=>{
    try{
        
        const token = req.header('Authorization');

        if(!token) { return res.status(401).json({ message: 'Unauthorized. No token provided.' }); }
        
        const user = jwt.verify(token,secret);
        
        console.log(user)
        const result =await User.findOne({_id:user.userId})
        //console.log(result)
        //console.log("hello1")

        if(result){
            req.user=user;
            next();
            
        }
        else{
            return res.json({success:false, message: `middleware auth user does not exists`});
        }
    }
    catch(err){
        return res.status(401).json({success:false,message:"authentication failed"})
    }
}