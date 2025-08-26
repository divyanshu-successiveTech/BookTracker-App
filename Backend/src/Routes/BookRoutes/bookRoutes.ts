import { Router } from "express";
import { getBooks } from "./getBooks";
import { addBookRouter } from "./saveBooks";
import { bookByAuthor } from "./bookByAuthorRoute";
import { bookByCategory } from "./bookByCategoryRoute";
import { getAllBooks } from "./getAllBooks";
import { likeRouter } from "./changeLikeRoute";

export const bookRouter = Router();

bookRouter.use(getBooks);
bookRouter.use(addBookRouter);
bookRouter.use(bookByAuthor);
bookRouter.use(bookByCategory);
bookRouter.use(getAllBooks);
bookRouter.use(likeRouter);