const express=require('express')
const jwt=require('jsonwebtoken')
const secret=process.env.JWT_SECRET;
require('dotenv').config();
const bcrypt=require('bcryptjs')
const User=require('../models/usermodel');
const authenticationJwt = require('../middleware/authmiddleware');

const router=express.Router();

router.post('/register',async(req,res)=>{
    const {email,password,fullname}=req.body;
    try{
            const existuser= await User.findOne({where:{email}});
            if(existuser){
                return res.status(400).json({message:"user already exist"})
            }
            const salt=await bcrypt.genSalt(10);
            const hashpassword=await bcrypt.hash(password,salt);

            const user=await User.create({email,password:hashpassword,fullname})
            res.status(201).json({message:"user created successfully",
                user:{id:user.id,email:user.email,fullname:user.fullname}})
    }catch(err){
        console.log("error:",err);
        res.status(500).json({message:"server error ...."})
        

    }
});


router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({where:{email}});
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const passwordvalid=await bcrypt.compare(password,user.password);
        if(!passwordvalid){
            return res.status(400).json({message:"password not valid"})
        }
            // here generate  awt token
        const token=jwt.sign(
            {id:user.id,email:user.email},secret,

        )
        res.status(200).json({message:"user logged in successfully",
            token,
            user:{id:user.id,email:user.email,fullname:user.fullname},
        })
    }catch(err){
        console.log("error:",err);
        res.status(500).json({message:" login server error..."})
    }
})

router.get('/dashboard',authenticationJwt,(req,res)=>{
    res.json({message:"profile accessed", user:req.user})
})

module.exports=router;