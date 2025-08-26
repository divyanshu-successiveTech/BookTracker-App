import { Router } from "express";
import { userController } from "../../Controllers/UserController/UserController";
import { verifyotp } from "../../Middlewares/UserMiddleware/verifyOtp";

export const verifyOtpRouter = Router()

verifyOtpRouter.post("/verifyOtp",verifyotp.verify,userController.verifyOtp)