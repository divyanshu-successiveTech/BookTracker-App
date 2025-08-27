import { Router } from "express";
import { userReadlist } from "./UserReadlist";
import { userBooksInReadlist } from "./getUserBooks";
import { likedBooks } from "./userLikedBooks";

export const userBookRouter = Router();

userBookRouter.use( userReadlist)
userBookRouter.use(userBooksInReadlist)
userBookRouter.use(likedBooks)