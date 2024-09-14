// import {asyncHandler } from "../utils/asyncHandler.js"
// import {User} from "../models/user.model.js"
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// const VehicleInfo=asyncHandler(async(req,res)=>{});

// export{VehicleInfo};

import { asyncHandler } from "../utils/asyncHandler.js";
import { Vehicle } from "../models/vehicle.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const vehicleInfo = asyncHandler(async (req, res) => {
    
    const { vehicleid, vehicleType, Hours, Days, Week, Availabilty} = req.body;
    console.log(req.body);
    console.log("email:",vehicleid);
    console.log("fullname:",vehicleType);
    console.log("username:",Hours);
    console.log("password:",Days);
    console.log("password:",Week);
    console.log("password:",Availabilty);
    // Validate that all required fields are provided
    if ([vehicleid, vehicleType, Hours, Days, Week, Availabilty].some(field => field === undefined || field === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // already exist
    const existingVehicle = await Vehicle.findOne({ vehicleid });
    if (existingVehicle) {
        throw new ApiError(409, "A vehicle with this ID already exists");
    }

    const vehicle = await Vehicle.create({
        vehicleid,
        vehicleType,
        Hours,
        Days,
        Week,
        Availabilty: Availabilty.toLowerCase(),  // Ensure lowercase storage for consistency chatgpt ne bola
        // refreshToken  if we need
    });

    
    const createdVehicle = await Vehicle.findById(vehicle._id);

    // Check if vehicle was successfully created
    if (!createdVehicle) {
        throw new ApiError(500, "Something went wrong while registering the vehicle");
    } else {
        return res.status(201).json(new ApiResponse(201, createdVehicle, "Vehicle registered successfully"));
    }
});

export { vehicleInfo };
