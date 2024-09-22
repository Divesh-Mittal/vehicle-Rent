// import mongoose,{Schema} from "mongoose";

// const vehicleSchema= new Schema({
//     vehicleid:{
//         type:Number,
//     },
//     vehicleType:{
//         type:String,
//         required:true
//     },
//     Hours:{
//         type:Number,
//         required:true,
//     },
//     Days:{
//         type:Number,
//         required:true,
//     },
//     Week:{
//         type:Number,
//         required:true,
//     },

//     Availabilty:{
//         type:String,
//         required:true,
//         lowercase:true
//     },
//     refreshToken:{
//         type:String
//     }

// },{timestamps:true})

// export const Vehicle= mongoose.model("Vehicle",vehicleSchema);

import mongoose, { Schema } from "mongoose";
// import { User } from "./user.model.js";
const vehicleSchema = new Schema({
    vehicleId: {
        type: Number,
        required: true,
        unique: true,
    },
    VehicleName: {
        type: String,
        required: true,
    },
    VehicleType: {
        type: String,
        enum: ['Bike', 'Car', 'Scooter'],
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Hour: {
        type: Number,
        required: true,
    },
    Weekly: {
        type: Number,
        required: true,
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Daily: {
        type: Number,
        required: true,
    },
    Location: {
        type: Object,
        required: true,
    },
    // image s3 bucket 
}, { timestamps: true });

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
