import { Router } from "express";
import { sendotp } from "../../Middlewares/UserMiddleware/sendOtp";
import { userController } from "../../Controllers/UserController/UserController";

export const sendOtpRouter = Router();

sendOtpRouter.post("/sendOtp",sendotp.send,userController.sendOtp)