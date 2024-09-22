// import {asyncHandler } from "../utils/asyncHandler.js"
// import {User} from "../models/user.model.js"
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// const VehicleInfo=asyncHandler(async(req,res)=>{});

// export{VehicleInfo};

// import { asyncHandler } from "../utils/asyncHandler.js";
// import { Vehicle } from "../models/vehicle.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const vehicleInfo = asyncHandler(async (req, res) => {
    
//     const { vehicleid, vehicleType, Hours, Days, Week, Availabilty} = req.body;
//     console.log(req.body);
//     console.log("email:",vehicleid);
//     console.log("fullname:",vehicleType);
//     console.log("username:",Hours);
//     console.log("password:",Days);
//     console.log("password:",Week);
//     console.log("password:",Availabilty);
//     // Validate that all required fields are provided
//     if ([vehicleid, vehicleType, Hours, Days, Week, Availabilty].some(field => field === undefined || field === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     // already exist
//     const existingVehicle = await Vehicle.findOne({ vehicleid });
//     if (existingVehicle) {
//         throw new ApiError(409, "A vehicle with this ID already exists");
//     }

//     const vehicle = await Vehicle.create({
//         vehicleid,
//         vehicleType,
//         Hours,
//         Days,
//         Week,
//         Availabilty: Availabilty.toLowerCase(),  // Ensure lowercase storage for consistency chatgpt ne bola
//         // refreshToken  if we need
//     });

    
//     const createdVehicle = await Vehicle.findById(vehicle._id);

//     // Check if vehicle was successfully created
//     if (!createdVehicle) {
//         throw new ApiError(500, "Something went wrong while registering the vehicle");
//     } else {
//         return res.status(201).json(new ApiResponse(201, createdVehicle, "Vehicle registered successfully"));
//     }
// });

// export { vehicleInfo };

import { asyncHandler } from "../utils/asyncHandler.js";
import { Vehicle } from "../models/vehicle.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const CreateVehicle=asyncHandler( async(req,res)=> {
    const{vehicleid,vehicleType, Hours, Days, Week, Availabilty} =req.body;
    if([vehicleid,vehicleType, Hours, Days, Week, Availabilty].some(field => field === undefined || field === "")){
        throw new ApiError(400,"all fields are required")
    }
    const ExistingVechicle=await Vehicle.findOne({vehicleid});
    if(ExistingVechicle)
        throw new ApiError(400,"ALready present");
    const NewVechicle= await Vehicle.create({
        vehicleid,
        vehicleType, 
        Hours, 
        Days,
        Week, 
        Availabilty
    })
    const createdVehicle = await Vehicle.findById(vehicleid);

    // Check if the vehicle was successfully created
    if (!createdVehicle) {
        throw new ApiError(500, "Something went wrong while registering the vehicle");
    } else {
        return res.status(201).json({
            message: "vechicle creates sucessfully",
            vehicle: createdVehicle
        })
    }
});
export const getVechicle=asyncHandler(async(req,res)=> {
    const getVeh=await Vehicle.find({},'vehicleid')
    if(getVeh.length == 0){
            throw new ApiError(404,"coudnt reterive")
    }
    else{
        console.log(getVeh);
        return res.status(201).json(new ApiResponse('400',getVeh,"sucess"));
    }
})

export const FilterVehicle = asyncHandler(async (req, res) => {
    console.log(true);
    const { vehicleType, Price, RentType } = req.body;
    let query = {};

    if (vehicleType) query.vehicleType = vehicleType;
    if (Price && RentType === 'Hourly') query.Hour = { $lte: Price };
    if (Price && RentType === 'Daily') query.Daily = { $lte: Price };
    if (Price && RentType === 'Weekly') query.Weekly = { $lte: Price };

    try {
        // Fetch vehicles based on the query
        const vehicles = await Vehicle.find(query)
            .select('name Price')  
            .populate('Owner'); // Populate the owner if needed

        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching filtered vehicles:', error);
        res.status(500).send('Server error');
    }
});
