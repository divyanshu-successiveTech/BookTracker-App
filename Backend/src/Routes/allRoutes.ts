import { Router } from "express";
import { userRouter } from "./UserRoutes/userRoutes";
import { categoryRouter } from "./CategoryRoutes/categoryRoutes";
import { bookRouter } from "./BookRoutes/bookRoutes";
import { authorRouter } from "./AuthorRoutes/authorRoutes";
import { userBookRouter } from "./UserBookRoutes/userBookRoutes";

export const allRouter = Router();

allRouter.use(userRouter);
allRouter.use(categoryRouter);
allRouter.use(bookRouter);
allRouter.use(authorRouter);
allRouter.use(userBookRouter);