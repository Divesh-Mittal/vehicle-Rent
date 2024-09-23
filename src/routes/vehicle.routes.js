import { Router } from "express";
import { createVehicle, getVehicles,filterVehicles} from "../controllers/vehicle.controller.js";

const router= Router();


//secured routes

router.route('/create').post(createVehicle);
router.route('/info').get(getVehicles);
router.route('/filter').get(filterVehicles);

export default router