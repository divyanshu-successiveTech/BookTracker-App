import { Router } from "express";
import { registerRouter } from "./registerRoute";
import { loginRouter } from "./loginRoute";
import { sendOtpRouter } from "./sendOtpRouter";
import { verifyOtpRouter } from "./verifyOtpRoute";

export const userRouter = Router();

userRouter.use(registerRouter);
userRouter.use(loginRouter);
userRouter.use(sendOtpRouter);
userRouter.use(verifyOtpRouter);