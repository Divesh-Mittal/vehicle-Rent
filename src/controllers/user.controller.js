import {asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{

    //handling the inputs
    const {username, password, email,fullname}=req.body;
    console.log(req.body);
    console.log("email:",email);
    console.log("fullname:",fullname);
    console.log("username:",username);
    console.log("password:",password);

    //validating the inputs if they are somehow null or empty
    if([username,password,email,fullname].some(fields=>fields?.trim()==="")){
        throw new ApiError(400,"ALl Fields are required");
    }
    
        
    
//     //validating if the user already exist
   const existedUser= await User.findOne({
        $or:[{username},{email}]
    })
    
    if(existedUser){
        throw new ApiError(409,"User with the email or username alraedy exist");
    }
   
    //after validating regsitring the user into our database
    const user=await User.create({
        fullname,
        email,
        password,
        username:username.toLowerCase()
    })
    const createduser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createduser){
        throw new ApiError(500,"Something Went  Wrong while registering the user");
    }else{
        return res.status(201).json(
            new ApiResponse(200,createduser,"user registered successfully")
        )
    }

    
});

export {
    registerUser,
}
