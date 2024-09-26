
import { asyncHandler } from "../utils/asyncHandler.js";
import { Vehicle } from "../models/vehicle.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { upadateOnCloudinary } from "../utils/cloudinary.js";
 const createVehicle=asyncHandler(async(req,res)=>{
    const {VehicleName, vehicleType, Hour,
        // Owner
         Daily,Weekly,fuelType } = req.body;
         console.log(req.body);
    // console.table([VehicleName, vehicleType, Hour, Daily, Weekly,fuelType ]);

    if([VehicleName, vehicleType, Hour,
        // Owner,
         Daily, Weekly,fuelType].some(field => field === undefined || field ==="")){
        throw new ApiError(400,"all field are required");
    }
    const existingVehicle=await Vehicle.findOne({VehicleName});
    console.log(existingVehicle);
    
    if(existingVehicle)
        throw new ApiError(400,"Vehicle already exists");
    // this vehicleImage is defined in the routes vehicle.routes.js thats why we have used it here
    console.log(req.file);
    
    const vehicleImagePath=req.file?.path;
    console.log(vehicleImagePath);
    
    //this validation is applied with the fact that the vehcile image is expected with every vhrcle registrtaion
    if(!vehicleImagePath){
        throw new ApiError(400,"vehicle image is required");
    }

    // well for now i am also storing the  local copy of the file in my disk but after evrything correct i will modify my clodinary function to dlete it from myserver after each successful upload on cloudinary

    const publicVehicleImage=await upadateOnCloudinary(vehicleImagePath);
    // console.log(publicVehicleImage);

    if(!publicVehicleImage){
        throw new ApiError(400,"vehicle image is required");
    }
    const newVehicle= await Vehicle.create({
        VehicleName, vehicleType, Hour,
        // Owner, 
        Daily, Weekly, fuelType,
        vehicleImage:publicVehicleImage?.url || ""
    });
    // Check if the vehicle was successfully created
    if (newVehicle) {
        return res.status(200).json({
            message: "Vehicle created successfully",
            vehicle: newVehicle,
        });
    } else {
        throw new ApiError(500, "Failed to create vehicle");
    }
});
 const getVehicles=asyncHandler(async(req,res)=>{
  const vehicle=await Vehicle.find({}).select('VehicleName vehicleType Hour Daily Weekly Owner FuelType Price');
  if(!vehicle.length)
        throw new ApiError(404,"cannot get the Vehicles")
//  res.send(new ApiResponse('200',"sucess"));
  return res.status(200).json(vehicle);
});

 const filterVehicles = asyncHandler(async (req, res) => {
    const { vehicleType, Price, RentType } = req.body;
    let query = {};

    // Build the query based on provided filters
    if (vehicleType) query.vehicleType = vehicleType;
    if (Price && RentType === 'Hourly') query.Hour = { $lte: Price };
    if (Price && RentType === 'Daily') query.Daily = { $lte: Price };
    if (Price && RentType === 'Weekly') query.Weekly = { $lte: Price };

    try {
        // Fetch vehicles based on the query
        const vehicles = await Vehicle.find(query)
            .select('VehicleName Price')  // Adjust fields as needed
            .populate('Owner', 'name'); // Populate specific fields from the Owner document if needed

        if (!vehicles.length) {
            throw new ApiError(404, "No vehicles found matching the criteria");
        }

        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching filtered vehicles:', error);
        res.status(500).json(new ApiError(500, 'Server error'));
    }
});

export {
    createVehicle,
    getVehicles,
    filterVehicles,
}