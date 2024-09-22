import { Router } from "express";
import { CreateVehicle,getVechicle ,FilterVehicle } from "../controllers/vehicle.controller.js";

const router= Router();


//secured routes
// router.route("/vehicleinfo").post(vehicleInfo);
// router.route("/login").post(login)

router.route('/create').post(CreateVehicle);
router.route('/info').get(getVechicle);
router.route('/filter').get(FilterVehicle);

export default router