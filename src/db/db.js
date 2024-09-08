import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async()=>{
    try {
       const connInstance= await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
       console.log(`\n mongoDB connected !! DB host :${connInstance.connection.host}`);
       
    } catch (error) {
        console.log(`MongoDb connection error `,error);
        process.exit(1)
        
    }
}
//console log connInstance

export default connectDB

// console.log(DB_NAME)