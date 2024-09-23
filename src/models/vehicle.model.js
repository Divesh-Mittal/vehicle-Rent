
import { User } from "./user.model.js";
import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema({
    VehicleName: {
        type: String,
        required: true,
    },
    vehicleType: {
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
        ref: User,
        // required: true,
    },
    Daily: {
        type: Number,
        required: true,
    },
    // Location: {
    //     type: Object,
    //     required: true,
    // },
    FuelType:{
        type:String,
        required:true,
    },
    // image s3 bucket 
}, { timestamps: true });

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
