import { Router } from "express";
import { userBookMiddleware } from "../../Middlewares/UserBooksMiddleware/userBooksMiddlware";
import { userBookController } from "../../Controllers/UserBooksController/userBooksController";

export const userReadlist = Router();

userReadlist.put("/user",userBookMiddleware.putValidation,userBookController.addOrUpdateList)