import mongoose,{Schema} from "mongoose";

const vehicleSchema= new Schema({
    vehicleid:{
        type:Number,
    },
    vehicleType:{
        type:String,
        required:true
    },
    Hours:{
        type:Number,
        required:true,
    },
    Days:{
        type:Number,
        required:true,
    },
    Week:{
        type:Number,
        required:true,
    },

    Availabilty:{
        type:String,
        required:true,
        lowercase:true
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})

export const Vehicle= mongoose.model("Vehicle",vehicleSchema);