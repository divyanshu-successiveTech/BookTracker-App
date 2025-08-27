import { Router } from "express";
import { userBookMiddleware } from "../../Middlewares/UserBooksMiddleware/userBooksMiddlware";
import { userLikedBooksController } from "../../Controllers/UserBooksController/userLikedBooksController";
import { userlikedBookMiddleware } from "../../Middlewares/UserBooksMiddleware/userLikedBooksMiddleware";
import { getUserBooksMiddleware } from "../../Middlewares/UserBooksMiddleware/getUserBooks";

export const likedBooks = Router();

likedBooks.put("/liked",userlikedBookMiddleware.putValidation,userLikedBooksController.userlikedBooks)

likedBooks.get("/likedBooks/:userId",getUserBooksMiddleware.userBooksValidation,userLikedBooksController.getLikedBooks)