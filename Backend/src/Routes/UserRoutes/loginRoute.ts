import { Router } from "express";
import { userController } from "../../Controllers/UserController/UserController";
import { userLogin } from "../../Middlewares/UserMiddleware/UserLogin";

export const loginRouter = Router();

loginRouter.post("/login",userLogin.login,userController.findUser)