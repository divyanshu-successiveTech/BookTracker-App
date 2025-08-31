import { Router } from "express";
import { userLikedBooksController } from "../../Controllers/UserBooksController/userLikedBooksController";
import { userlikedBookMiddleware } from "../../Middlewares/UserBooksMiddleware/userLikedBooksMiddleware";
import { getUserBooksMiddleware } from "../../Middlewares/UserBooksMiddleware/getUserBooks";
import { userFavauriteBookMiddleware } from "../../Middlewares/UserBooksMiddleware/userfavouriteBookMiddleware";
import { userBookController } from "../../Controllers/UserBooksController/userBooksController";
import { userFavouriteBooksController } from "../../Controllers/UserBooksController/userFavouriteBookController";
import { getUserFavouriteBooksMiddleware } from "../../Middlewares/UserBooksMiddleware/getUserFavouriteBooksMiddleware";

export const FavouriteBooks = Router();

FavouriteBooks.put("/favouriteBooks",userFavauriteBookMiddleware.putFavouriteValidation,userFavouriteBooksController.userFavouriteBooks)

FavouriteBooks.get("/favouriteBooks/:userId",getUserFavouriteBooksMiddleware.userFavouriteBooksValidation,userFavouriteBooksController.getFavouriteBooks)