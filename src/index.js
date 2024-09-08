// alternate way of using 
// require('dotenv').config({path:"./env"})


/*
(async()=>{
import mongoose  from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app =express()
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       //listener for handling the error
       app.on("error",(error)=>{
        console.log("err occured");
        throw error;
        
       })
       app.listen(process.env.PORT,()=>{
        console.log(`server is running successfully on port ${process.env.PORT}`);
        
       })
    } catch (error) {
        console.error("ERROR:",error);
        throw error
        
    }
})()

*/

import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import { app } from './app.js';

dotenv.config({
    path:'../.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on the port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(`mongo connection failed `);
})
// console.log(process.env.PORT);
