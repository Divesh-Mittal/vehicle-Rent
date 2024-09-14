import {asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{

    //handling the inputs
    const {username, password, email,fullname}=req.body;
    // console.log(req.body);
    // console.log("email:",email);
    // console.log("fullname:",fullname);
    // console.log("username:",username);
    // console.log("password:",password);

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

const generateAccessAndRefreshTokens=async(userId)=>{
        try {
            const user =await User.findById(userId);
           const accessToken= user.generateAccessToken();
           const refreshToken= user.generateRefreshToken();

           user.refreshToken=refreshToken;
          await  user.save({validateBeforeSave:false});

          return {accessToken,refreshToken};
        } catch (error) {
            throw new ApiError(500,"something went wrong while generating refresh tokens");
        }
}
const login= asyncHandler(async(req,res)=>{
    //ok we have to fetch the user details first
    //email and pass
    //find the user
    //validate the pass
    //access and refresh token sent via cookie
    const {email, password}=req.body;
    // console.log(password);
    if(!email)throw  new ApiError(400,"email is required");

   const loginedUser=await  User.findOne({email})
    console.log(loginedUser);
   if(!loginedUser)throw new ApiError(404,"user not found");

   const isPassowrdValid=await loginedUser.isPasswordCorrect(password);
   console.log(isPassowrdValid);
   if(!isPassowrdValid)throw new ApiError(401,"Wrong password");
   const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(loginedUser._id);

   //again fetching the user to send it by the means of a cookie
   const user=await User.findById(loginedUser._id).select("-password -refreshToken");

   //this will make it modifiable only by the server which makes it way secure
   const options={
    httpOnly:true,
    secure:true
   }
   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(
        200,
        {
            user:user,accessToken,refreshToken
        },
        "user logined successfully",
    )
   )
});

const logout=asyncHandler(async (req,res)=>{

   await  User.findByIdAndUpdate(
        req.user._id,
        {
            //it tells us what to set and update 
            $set:{
                refreshToken:undefined
            }
        },
        {
            //it ensures that the return value must be updated one
            new:true
        }

    )
    const options={
        httpOnly:true,
        secure:true
       }

       return res.status(200).clearCookie("accessToken",options)
       .clearCookie("refreshToken",options)
       .json(
        new ApiResponse(
            200,
            {}
            ,"user logout",
        )
       )
});
//_ can be used where we are skipping that thing
export {
    registerUser,
    login,
    logout,
}
