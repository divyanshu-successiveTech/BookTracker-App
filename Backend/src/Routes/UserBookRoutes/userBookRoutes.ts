import { Router } from "express";
import { userReadlist } from "./UserReadlist";
import { userBooksInReadlist } from "./getUserBooks";

export const userBookRouter = Router();

userBookRouter.use( userReadlist)
userBookRouter.use(userBooksInReadlist)