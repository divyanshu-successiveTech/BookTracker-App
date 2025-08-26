import { Router } from "express";
import { userRegister } from "../../Middlewares/UserMiddleware/UserRegister";
import { userController } from "../../Controllers/UserController/UserController";
import { registerSchema } from "../../Middlewares/UserMiddleware/UserRegister";

export const registerRouter = Router();

registerRouter.post("/register",userRegister.register(registerSchema),userController.saveUser)