const jwt=require('jsonwebtoken');
require('dotenv').config();
const secret=process.env.JWT_SECRET;

const authenticationJwt=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        res.status(401).json({message:"access denied token not provide"})
    }
    try{
        const decode=jwt.verify(token.replace("Bearer ", ""),secret);
        req.user=decode;
        next();
    }catch(err){
        console.log("error:",err);
        res.status(403).json({messsage:"invalid token"})
        
    }
}

module.exports=authenticationJwt;