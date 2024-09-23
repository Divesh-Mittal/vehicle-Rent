

import { Router } from "express"
import {login, logout, registerUser} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

//secured routes
const router= Router();
router.route("/register").post(registerUser);
router.route("/login").post(login)
router.route("/logout").post(verifyJwt,logout)


export default router