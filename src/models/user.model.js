import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
// import express from "express";
dotenv.config({
    path:'../../.env'
})
const userSchema= new Schema({
    // username:{
    //     type:String,
    //     required:true,
    //     unique:true,
    //     lowercase:true,
    //     trim:true,
    //     index:true
    // },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true});

userSchema.pre("save", async function (next){
    //password has beeen fixed
    if(!this.isModified("password"))return  next();
    console.log(this.password);
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.isPasswordCorrect=async function(password){
// console.log(password);
// console.log(this.password);
   return await bcrypt.compare(password,this.password)
// return this.password===password;
}

userSchema.methods.generateAccessToken= function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        // username:this.username,
        name:this.name
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        // username:this.username,
        name:this.name
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User= mongoose.model("User",userSchema);

// console.log(process.env.ACCESS_TOKEN_SECRET);