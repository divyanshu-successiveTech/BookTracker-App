import { Router } from "express";
import { userReadlist } from "./UserReadlist";
import { userBooksInReadlist } from "./getUserBooks";
import { likedBooks } from "./userLikedBooks";
import { FavouriteBooks } from "./userFavouriteBookRoute";

export const userBookRouter = Router();

userBookRouter.use( userReadlist)
userBookRouter.use(userBooksInReadlist)
userBookRouter.use(likedBooks)
userBookRouter.use(FavouriteBooks);