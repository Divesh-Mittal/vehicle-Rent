import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({
    path:'../.env'
})
const app =express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentialS: true
}))

app.use(express.json({limit:"20kb"}));
// ye because browser ka format diff rehta haii
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"));
app.use(cookieParser())

//routes declaration 
import userRouter from "./routes/users.routes.js"

app.use("/api/v1/users",userRouter)
// userRouter("/register",registerUser)
export {app}

// console.log(process.env.CORS_ORIGIN);