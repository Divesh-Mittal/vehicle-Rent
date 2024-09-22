

import { Router } from "express"
import {login, logout, registerUser} from "../controllers/user.controller.js";
// import { vehicleInfo } from "../controllers/vehicle.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { CreateVehicle,getVechicle ,FilterVehicle } from "../controllers/vehicle.controller.js";

const router= Router();
router.route("/register").post(registerUser);
router.route("/login").post(login)

//secured routes
router.route("/logout").post(verifyJwt,logout)
// router.route("/vehicleinfo").post(vehicleInfo);
// router.route("/login").post(login)

router.route('/vehicles/create').post(CreateVehicle);
router.route('/vehicles/info').get(getVechicle);
router.route('/vehicles/filter').get(FilterVehicle)

export default router