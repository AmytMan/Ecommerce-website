import asyncHandler from 'express-async-handler';
import userModel from '../models/Users.js';
import bcrypt from 'bcrypt'
import generateToken from '../utils/jasonwebtoken.js';

//register user 
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,location,date} = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    const userExist = await userModel.findOne({email:email});
    if(userExist){
        return res.status(400).json({msg:"This email is already registered. Please use different email"})
    }
    const NewUser = await userModel.create({
       name,
       email,
       password:hashPassword,
       location,
       date
    });
    if(NewUser){
       return res.status(201).json({
        msg:"Account created successfully",
           Data:{
            id: NewUser._id,
            name:NewUser.name,
            email:NewUser.email,
            location:NewUser.location
            }            
        })
    }else{
       return res.status(400).json({msg:'invalid user data'})
    }
})

//login user
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({msg:'Invalid Email or User not registered'})
    }else{
       const isMatch = await bcrypt.compare(password,user.password) 
       if(email==user.email && isMatch){
       generateToken(res,user._id)
     
       res.status(200).json({ msg:"user logged in successfully", user:{
        name:user.name,
        email:user.email,
        location:user.location
       }})
    }else{
        res.status(401).json({msg:"password not matched"})
    }
    }
      
})
//logout user
const logOutUser = asyncHandler(async(req,res)=>{
    res.cookie('token','',{
        httpsOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({msg:"User Logged Out"})
})

//get user profile
const getUserProfile = asyncHandler(async(req,res)=>{
    const userinfo = req.user
    res.send(userinfo)
})

//update user Profile
const updateUserProfile = asyncHandler(async(req,res)=>{
   const user = await userModel.findById(req.user._id)
   if(user){
    user.name = req.body.name || user.name ;
    user.email = req.body.email || user.email ;
    user.location =req.body.location || user.location
   if(req.body.password){
    const hashpassword = await bcrypt.hash(req.body.password ,10)
    user.password = hashpassword
   }
    await user.save();
   }
   res.status(200).json({msg:"user detail updated successfully"})
})

export {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile
}
