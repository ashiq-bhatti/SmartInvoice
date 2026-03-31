import express from "express";
import { testApi, userLogin, userRegister } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoute = express.Router();

authRoute.post('/user-register',userRegister);
authRoute.post('/user-login',userLogin);
authRoute.get('/user-get-test-api',authMiddleware,testApi);

export default authRoute;