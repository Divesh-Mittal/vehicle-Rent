import mongoose from "mongoose" ;
import { Schema } from "mongoose";
import { User } from "./user.model.js";
import { Vehicle } from "./vehicle.model.js";
const BookingSchema = new Schema({
    // _id: {
    //     type: Number,
    //     unique: true,
    //     required: true,
    // },
    Vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Vehicle,
        required: true,
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    PickDate: {
        type: Date,
        required: true,
    },
    DropDate: {
        type: Date,
        required: true,
    },
    PickTime: {
        type: String,
        required: true,
    },
    DropTime: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Booking = mongoose.model("Booking", BookingSchema);
