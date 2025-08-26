import { Router } from "express";
import { getUserBooksMiddleware } from "../../Middlewares/UserBooksMiddleware/getUserBooks";
import { userBookController } from "../../Controllers/UserBooksController/userBooksController";

export const userBooksInReadlist = Router();

userBooksInReadlist.get("/userBooks/:userId",getUserBooksMiddleware.userBooksValidation,userBookController.getUserBookList)