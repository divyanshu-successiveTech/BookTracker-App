import { Router } from "express";
import { bookController } from "../../Controllers/BookController/bookController";
import { getBookByAuthorMiddleware } from "../../Middlewares/BookMiddleware/bookByAuthor";

export const bookByAuthor = Router();

bookByAuthor.get("/author/:id",getBookByAuthorMiddleware.validateInput,bookController.getBookByAuthor)