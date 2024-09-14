

import { Router } from "express"
import {login, logout, registerUser} from "../controllers/user.controller.js";
import { vehicleInfo } from "../controllers/vehicle.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router= Router();
router.route("/register").post(registerUser);
router.route("/login").post(login)

//secured routes
router.route("/logout").post(verifyJwt,logout)
router.route("/vehicleinfo").post(vehicleInfo);
// router.route("/login").post(login)
export default router