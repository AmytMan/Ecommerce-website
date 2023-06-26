import jwt from 'jsonwebtoken';
import userModel from '../models/Users.js';
import asyncHandler from 'express-async-handler';


const protectedRoute = asyncHandler(async(req,res,next)=>{
    let token;
 token = req.cookies.token
if(token){
try {
    const decodedId = jwt.verify(token ,process.env.SECRET_KEY)
   req.user= await userModel.findOne({_id:decodedId.userId}).select('-password')
    next()
} catch (error) {
   res.status(401).json({
    msg:" Unauthorized user or invalid token"
   }) 
}
}
else{
    res.status(401).json({msg:"unauthorized or no token"})
}
});

export { protectedRoute};