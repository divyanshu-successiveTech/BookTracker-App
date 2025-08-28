import { Router } from "express";
import { getBooks } from "./getBooks";
import { addBookRouter } from "./saveBooks";
import { bookByAuthor } from "./bookByAuthorRoute";
import { bookByCategory } from "./bookByCategoryRoute";
import { getAllBooks } from "./getAllBooks";
import { likeRouter } from "./changeLikeRoute";
import { bookByNameRouter } from "./bookByNameRoute";
import { deleteBookRouter } from "./deleteBook";
import { multipleBookAdd } from "./multipleBooks";

export const bookRouter = Router();

bookRouter.use(getBooks);
bookRouter.use(addBookRouter);
bookRouter.use(bookByAuthor);
bookRouter.use(bookByCategory);
bookRouter.use(getAllBooks);
bookRouter.use(likeRouter);
bookRouter.use(bookByNameRouter);
bookRouter.use(deleteBookRouter)
bookRouter.use(multipleBookAdd);