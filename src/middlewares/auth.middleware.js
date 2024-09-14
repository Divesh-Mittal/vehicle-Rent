import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import{User} from "../models/user.model.js"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
dotenv.config({
    path:'../../.env'
})
export const verifyJwt=asyncHandler(async(req,res,next)=>{
try {
    //checking for the access token
       const token= req.cookies?.accessToken || req.header
        ("Authorisation")?.replace("Bearer ","");

        //if not found then throw the error
        if(!token)throw  new ApiError(401,"Unauthorised User request")
            //decoding the token using the inbuilt function
            const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
           const user= await User.findById(decodeToken?._id).select("-password -refreshToken")
           if(!user)throw new ApiError(401,"Invalid Access Token");
            //put the details of the user object into the request
           req.user=user;
           next()
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token");
}
});
// console.log("hello");

// console.log(process.env.ACCESS_TOKEN_SECRET);