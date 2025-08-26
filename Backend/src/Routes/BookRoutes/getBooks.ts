import { Router } from "express";
import { fetchBooks } from "../../Middlewares/BookMiddleware/fetchBook";
import { bookController } from "../../Controllers/BookController/bookController";

export const getBooks = Router();

getBooks.post("/getBook",fetchBooks.validateInput,bookController.getBook)